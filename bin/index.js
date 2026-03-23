#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

// ANSI Color constants for professional CLI UI
const colors = {
    green: '\x1b[32m',
    cyan: '\x1b[36m',
    red: '\x1b[31m',
    dim: '\x1b[90m',
    reset: '\x1b[0m',
    check: '\x1b[32m✔\x1b[0m',
    cross: '\x1b[31m✖\x1b[0m',
    info: '\x1b[36mℹ\x1b[0m',
    pipe: '\x1b[90m│\x1b[0m'
};

// Role argument parsing
const args = process.argv.slice(2);
const roleArg = args.find(arg => arg.startsWith('--role='));

if (!roleArg) {
    console.error(`\n${colors.cross} Please provide a role.`);
    console.error(`  ${colors.dim}Example: npx agent-skills-cli --role=po_ba${colors.reset}`);
    console.error(`  ${colors.info} Supported roles: frontend, backend, po_ba, designer, tester\n`);
    process.exit(1);
}

const role = roleArg.split('=')[1];
const currentDir = process.cwd();
const templateDir = path.join(__dirname, '..', 'templates', '.agent');
const targetDir = path.join(currentDir, '.agent');

console.log(`\n${colors.check} Initializing environment for role: ${colors.cyan}${role}${colors.reset}`);

try {
    let rolesToInstall = [];
    if (role === 'frontend') {
        rolesToInstall = ['dev/common', 'dev/frontend'];
    } else if (role === 'backend') {
        rolesToInstall = ['dev/common', 'dev/backend'];
    } else if (role === 'dev') {
        console.error(`\n${colors.cross} Role 'dev' is no longer supported. Please use '--role=frontend' or '--role=backend'.`);
        process.exit(1);
    } else if (role === 'all') {
        console.error(`\n${colors.cross} Role 'all' is no longer supported. Please install specific roles sequentially.`);
        process.exit(1);
    } else {
        rolesToInstall = [role];
    }

    // 1. Create target structure
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const subfolders = ['agents', 'rules', 'skills', 'workflows'];
    subfolders.forEach(sub => {
        const dest = path.join(targetDir, sub);
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    });

    // 2. Install Common (Global) components
    const commonDir = path.join(templateDir, 'common');
    if (fs.existsSync(commonDir)) {
        ['rules', 'workflows'].forEach(sub => {
            const src = path.join(commonDir, sub);
            const dest = path.join(targetDir, sub);
            if (fs.existsSync(src)) {
                fs.cpSync(src, dest, { recursive: true, force: true });
            }
        });
        console.log(`${colors.pipe} Installed global common rules and workflows`);
    }

    // 3. Install Role-specific components (Flattened)
    rolesToInstall.forEach(r => {
        const roleSourceDir = path.join(templateDir, r);
        if (!fs.existsSync(roleSourceDir)) {
            if (!r.includes('/')) {
                console.error(`\n${colors.cross} Could not find folder for role: ${r}`);
                console.error(`${colors.pipe} Supported roles: frontend, backend, po_ba, designer, tester`);
                process.exit(1);
            }
            return;
        }

        // Check for role-specific ARCHITECTURE.md and install it at root
        const roleArch = path.join(roleSourceDir, 'ARCHITECTURE.md');
        if (fs.existsSync(roleArch)) {
            fs.copyFileSync(roleArch, path.join(targetDir, 'ARCHITECTURE.md'));
            console.log(`${colors.pipe} Installed architecture spec for ${colors.cyan}${r}${colors.reset}`);
        }

        // Install common subfolders
        subfolders.forEach(sub => {
            const src = path.join(roleSourceDir, sub);
            const dest = path.join(targetDir, sub);
            if (fs.existsSync(src)) {
                fs.cpSync(src, dest, { recursive: true, force: true });
            }
        });
        console.log(`${colors.pipe} Installed agents, rules, skills, workflows for ${colors.cyan}${r}${colors.reset}`);
    });

    // 4. Setup OpenSpec for Dev Roles
    if (role === 'frontend' || role === 'backend') {
        try {
            console.log(`${colors.pipe} Checking if OpenSpec is installed...`);
            let isInstalled = false;
            try {
                execSync('openspec --version', { stdio: 'ignore' });
                isInstalled = true;
                console.log(`${colors.info} OpenSpec is already installed globally.`);
            } catch (e) {
                // Not installed
            }

            if (!isInstalled) {
                console.log(`${colors.pipe} Installing OpenSpec framework globally...`);
                // Install globally via npm
                execSync('npm install -g @fission-ai/openspec@latest', { stdio: 'inherit' });
            }

            console.log(`\n\n${colors.pipe} Initializing OpenSpec for the project...`);
            // Only run init if openspec directory doesn't exist to avoid errors
            if (!fs.existsSync(path.join(currentDir, 'openspec'))) {
                execSync('openspec init', { stdio: 'inherit', cwd: currentDir });
            }

            // Automatically configure OpenSpec to generate artifacts in Vietnamese
            const openspecConfigPath = path.join(currentDir, 'openspec', 'config.yaml');
            if (fs.existsSync(openspecConfigPath)) {
                let configData = fs.readFileSync(openspecConfigPath, 'utf8');
                if (!configData.includes('Language: Vietnamese')) {
                    // Match 'context: |' or '# context: |'
                    configData = configData.replace(/^#?\s*context:\s*\|/m, "context: |\n  Language: Vietnamese\n  All artifacts must be written in Vietnamese. Keep technical terms in English.\n");
                    fs.writeFileSync(openspecConfigPath, configData, 'utf8');
                    console.log(`${colors.pipe} Configured OpenSpec output language to Vietnamese`);
                }
            }

            execSync('openspec update', { stdio: 'inherit', cwd: currentDir });
            console.log(`${colors.pipe} OpenSpec structure created/updated`);
        } catch (specError) {
            console.error(`\n${colors.cross} OpenSpec setup failed. You may need 'sudo' permissions on Mac/Linux.`);
            console.error(`${colors.pipe} Run manually: sudo npm install -g @fission-ai/openspec@latest`);
            console.error(`${colors.pipe} Then run: openspec init && openspec update`);
        }
    }

    console.log(`${colors.check} Setup complete for ${colors.cyan}${role}${colors.reset}`);
    // console.log(`${colors.pipe} Structure: .agent/ {ARCHITECTURE.md, agents, rules, skills, workflows}\n`);

} catch (error) {
    console.error(`\n${colors.cross} An error occurred during installation:`, error.message);
    process.exit(1);
}

#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

// Role argument parsing
const args = process.argv.slice(2);
const roleArg = args.find(arg => arg.startsWith('--role='));

if (!roleArg) {
    console.error("❌ Please provide a role. Example: npx @uocnv/agent-installer --role=po_ba");
    console.error("Supported roles: frontend, backend, po_ba, designer, tester");
    process.exit(1);
}

const role = roleArg.split('=')[1];
const currentDir = process.cwd();
const templateDir = path.join(__dirname, '..', 'templates', '.agent');
const targetDir = path.join(currentDir, '.agent');

console.log(`🚀 Initializing environment for role: ${role}...`);

try {
    let rolesToInstall = [];
    if (role === 'frontend') {
        rolesToInstall = ['dev/common', 'dev/frontend'];
    } else if (role === 'backend') {
        rolesToInstall = ['dev/common', 'dev/backend'];
    } else if (role === 'dev') {
        console.error("❌ Role 'dev' is no longer supported. Please use '--role=frontend' or '--role=backend'.");
        process.exit(1);
    } else if (role === 'all') {
        console.error("❌ Role 'all' is no longer supported. Please install specific roles sequentially.");
        process.exit(1);
    } else {
        rolesToInstall = [role];
    }



    // 1. Create target structure
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const subfolders = ['agents', 'rules', 'skills', 'workflow'];
    subfolders.forEach(sub => {
        const dest = path.join(targetDir, sub);
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    });

    // 2. [DELETED] Global ARCHITECTURE.md installation removed as per user request.

    // 3. Install Common (Global) components
    const commonDir = path.join(templateDir, 'common');
    if (fs.existsSync(commonDir)) {
        ['rules', 'workflow'].forEach(sub => {
            const src = path.join(commonDir, sub);
            const dest = path.join(targetDir, sub);
            if (fs.existsSync(src)) {
                fs.cpSync(src, dest, { recursive: true, force: true });
            }
        });
        console.log("✅ Installed global common rules and workflows");
    }

    // 4. Install Role-specific components (Flattened)
    rolesToInstall.forEach(r => {
        const roleSourceDir = path.join(templateDir, r);
        if (!fs.existsSync(roleSourceDir)) {
            if (!r.includes('/')) {
                console.error(`⚠️ Could not find folder for role: ${r}`);
                console.error("Supported roles: frontend, backend, po_ba, designer, tester");
                process.exit(1);
            }
            return;
        }

        // Check for role-specific ARCHITECTURE.md and install it at root
        const roleArch = path.join(roleSourceDir, 'ARCHITECTURE.md');
        if (fs.existsSync(roleArch)) {
            fs.copyFileSync(roleArch, path.join(targetDir, 'ARCHITECTURE.md'));
            console.log(`✅ Installed role-specific ARCHITECTURE.md from: ${r}`);
        }

        // Install common subfolders
        subfolders.forEach(sub => {
            const src = path.join(roleSourceDir, sub);
            const dest = path.join(targetDir, sub);
            if (fs.existsSync(src)) {
                fs.cpSync(src, dest, { recursive: true, force: true });
                console.log(`✅ Installed components from: ${r}/${sub}`);
            }
        });
    });


    console.log(`\n✅ Successfully installed [${role}] in the project.`);
    console.log(`Structure: .agent/ {ARCHITECTURE.md, agents, rules, skills, workflow}`);

    // 5. Setup OpenSpec for Dev Roles
    if (role === 'frontend' || role === 'backend') {
        console.log(`\n⚙️  Setting up Official OpenSpec framework for Dev Role...`);
        console.log(`(This may take a moment to download & initialize)`);
        
        try {
            execSync('npx -y @fission-ai/openspec@latest init', { stdio: 'inherit', cwd: currentDir });
            execSync('npx -y @fission-ai/openspec@latest update', { stdio: 'inherit', cwd: currentDir });
            console.log("✅ Successfully initialized OpenSpec!");
        } catch (specError) {
            console.error("⚠️ Automatically installing OpenSpec failed. Please run manually:");
            console.error("npx @fission-ai/openspec init && npx @fission-ai/openspec update");
        }
    }

} catch (error) {
    console.error("❌ An error occurred during installation:", error.message);
    process.exit(1);
}



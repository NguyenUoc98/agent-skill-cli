#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// Role argument parsing
const args = process.argv.slice(2);
const roleArg = args.find(arg => arg.startsWith('--role='));

if (!roleArg) {
    console.error("❌ Please provide a role. Example: npx @uocnv/agent-installer --role=po_ba");
    console.error("Supported roles: po_ba, designer, dev, tester, all");
    process.exit(1);
}

const role = roleArg.split('=')[1];
const currentDir = process.cwd();
const templateDir = path.join(__dirname, '..', 'templates', '.agent');
const targetDir = path.join(currentDir, '.agent');

console.log(`🚀 Initializing environment for role: ${role}...`);

try {
    if (role === 'all') {
        fs.cpSync(templateDir, targetDir, { recursive: true, force: true });
        console.log("✅ Successfully applied all base Rules, Skills, and Workflows to the project!");
    } else {
        // Check if the base Role exists in skills (as a primary check)
        const roleSkillsDir = path.join(templateDir, 'skills', role);
        if (!fs.existsSync(roleSkillsDir)) {
            console.error(`⚠️ Could not find base skills for role: ${role}`);
            console.error("Supported roles: po_ba, designer, dev, tester, all");
            process.exit(1);
        }

        // Helper function to apply role-specific content
        const applyRoleContent = (subDir) => {
            const srcDir = path.join(templateDir, subDir);
            const destDir = path.join(targetDir, subDir);

            if (!fs.existsSync(srcDir)) return;

            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
            }

            const items = fs.readdirSync(srcDir, { withFileTypes: true });
            for (const item of items) {
                const srcPath = path.join(srcDir, item.name);
                const destPath = path.join(destDir, item.name);

                // Copy files at the same level as role folders
                if (item.isFile()) {
                    if (item.name.startsWith('.')) continue; // Skip hidden files
                    
                    fs.copyFileSync(srcPath, destPath);
                    console.log(`✅ Installed file: .agent/${subDir}/${item.name}`);
                } 
                // Copy role-specific folder contents (Flattened)
                else if (item.isDirectory() && item.name === role) {
                    fs.cpSync(srcPath, destDir, { recursive: true, force: true });
                    console.log(`✅ Installed contents of role folder: .agent/${subDir}/${role}`);
                }
            }
        };

        // 1. Copy files at the root of .agent templates
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        
        const rootItems = fs.readdirSync(templateDir, { withFileTypes: true });
        for (const item of rootItems) {
            if (item.isFile()) {
                if (item.name.startsWith('.')) continue; // Skip hidden files

                fs.copyFileSync(path.join(templateDir, item.name), path.join(targetDir, item.name));
                console.log(`✅ Installed root file: .agent/${item.name}`);
            }
        }

        // 2. Process predefined folders
        const subfolders = ['agents', 'rules', 'skills', 'workflows'];
        for (const folder of subfolders) {
            applyRoleContent(folder);
        }

        console.log(`\n✅ Successfully installed [${role}] role in the project.`);
        console.log(`You can check and adjust features in .agent/ directory.`);
    }
} catch (error) {
    console.error("❌ An error occurred during installation:", error.message);
    process.exit(1);
}

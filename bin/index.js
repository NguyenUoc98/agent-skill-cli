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
        // Check if the base Role exists
        const srcRoleDir = path.join(templateDir, 'skills', role);
        if (!fs.existsSync(srcRoleDir)) {
            console.error(`⚠️ Could not find Base Skill for role: ${role}`);
            console.error("Supported roles: po_ba, designer, dev, tester, all");
            process.exit(1);
        }

        // Create target folder if it doesn't exist
        const destRoleDir = path.join(targetDir, 'skills', role);
        fs.mkdirSync(destRoleDir, { recursive: true });

        // Copy skills
        fs.cpSync(srcRoleDir, destRoleDir, { recursive: true, force: true });

        // Copy workflows (Selective by role)
        const srcWorkflowsDir = path.join(templateDir, 'workflows');
        const destWorkflowsDir = path.join(targetDir, 'workflows');
        const roleWorkflowFile = `${role}-workflow.md`;
        const srcWorkflowPath = path.join(srcWorkflowsDir, roleWorkflowFile);

        if (fs.existsSync(srcWorkflowPath)) {
            if (!fs.existsSync(destWorkflowsDir)) {
                fs.mkdirSync(destWorkflowsDir, { recursive: true });
            }
            fs.copyFileSync(srcWorkflowPath, path.join(destWorkflowsDir, roleWorkflowFile));
            console.log(`✅ Installed custom workflow for role: ${roleWorkflowFile}`);
        }

        // Copy rules (Local)
        const srcRulesDir = path.join(templateDir, 'rules');
        const destRulesDir = path.join(targetDir, 'rules');
        const ruleFile = `${role}-base.md`;
        const srcRulePath = path.join(srcRulesDir, ruleFile);

        if (fs.existsSync(srcRulesDir)) {
            if (!fs.existsSync(destRulesDir)) {
                fs.mkdirSync(destRulesDir, { recursive: true });
            }
            fs.copyFileSync(srcRulePath, path.join(destRulesDir, ruleFile));
            console.log(`✅ Installed custom rule for role: ${ruleFile}`);
        }

        console.log(`✅ Successfully installed [${role}] role in the project.`);
        console.log(`You can check and adjust features in .agent/ directory.`);
    }
} catch (error) {
    console.error("❌ An error occurred during installation:", error.message);
    process.exit(1);
}

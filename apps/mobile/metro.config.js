const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Watch only what the mobile app actually needs: its own source, shared
// packages, and shared node_modules. Do NOT watch monorepoRoot — that pulls
// in 3GB of videos/, apps/web/, supabase/, .git/ and hangs Metro indexing.
config.watchFolders = [
  projectRoot,
  path.resolve(monorepoRoot, "packages"),
  path.resolve(monorepoRoot, "node_modules"),
];

// Belt-and-suspenders: explicitly block heavy dirs in case a plugin walks
// the monorepo root anyway.
const heavyDirs = [
  path.resolve(monorepoRoot, "videos"),
  path.resolve(monorepoRoot, "apps", "web"),
  path.resolve(monorepoRoot, "supabase"),
  path.resolve(monorepoRoot, "nakshiq-autoposter"),
  path.resolve(monorepoRoot, ".git"),
  path.resolve(monorepoRoot, ".next"),
  path.resolve(monorepoRoot, ".turbo"),
];
config.resolver.blockList = new RegExp(
  heavyDirs.map((d) => "^" + escapeRe(d) + "(\\/|$)").join("|")
);

// Resolve packages from both mobile and root node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

config.resolver.disableHierarchicalLookup = true;

module.exports = config;

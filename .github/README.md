# GitHub Actions CI/CD Pipeline

This repository uses GitHub Actions for continuous integration and deployment. The pipeline automatically builds, tests, and publishes the OSLC components.

## Workflow Overview

The CI/CD pipeline consists of several jobs that run automatically:

### 1. Test Job
- **Trigger**: On every push and pull request
- **Actions**:
  - Installs dependencies for both components
  - Runs tests (if available)
  - Builds both components to verify they compile correctly
  - Validates the build artifacts

### 2. Build and Publish Job
- **Trigger**: On push to `main` branch
- **Actions**:
  - Builds both `@oslc/postmessage-helper` and `@oslc/selection-webcomponent`
  - Publishes packages to GitHub NPM registry
  - Skips publishing if version already exists
  - Uploads build artifacts for other jobs

### 3. Deploy Demo Job
- **Trigger**: On push to `main` branch (after successful build)
- **Actions**:
  - Builds the demo with production components
  - Deploys to GitHub Pages
  - Creates version information for deployment tracking

### 4. Publish Release Job
- **Trigger**: On GitHub release creation
- **Actions**:
  - Updates package versions to match release tag
  - Publishes versioned packages with `latest` tag
  - Creates release artifacts archive

## Package Registry

Packages are published to the GitHub NPM registry:
- **Registry URL**: `https://npm.pkg.github.com`
- **Packages**:
  - `@oslc/postmessage-helper`
  - `@oslc/selection-webcomponent`

## GitHub Pages Deployment

The demo is automatically deployed to GitHub Pages:
- **URL**: `https://OSLC.github.io/olsc-selection-utils/`
- **Source**: Built from `src/oslc-selection-demo/` with production components
- **Updates**: Automatically on every push to `main`

## Using the Published Packages

### Install from GitHub NPM Registry

First, configure npm to use the GitHub registry for `@oslc` packages:

```bash
npm config set @oslc:registry https://npm.pkg.github.com
```

Then install the packages:

```bash
npm install @oslc/postmessage-helper
npm install @oslc/selection-webcomponent
```

### Authentication

To install packages from the GitHub registry, you need to authenticate:

```bash
npm login --registry=https://npm.pkg.github.com
```

Or use a `.npmrc` file:

```
@oslc:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

## Environment Variables

The workflow uses these environment variables:

- `NODE_VERSION`: Node.js version (currently 18)
- `REGISTRY_URL`: GitHub NPM registry URL
- `GITHUB_TOKEN`: Automatically provided by GitHub Actions

## Permissions

The workflow requires these permissions:

- `contents: read` - Read repository contents
- `packages: write` - Publish to GitHub NPM registry
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - For GitHub Pages deployment

## Manual Deployment

To manually deploy or test locally:

### Build Components
```bash
# Windows
.\scripts\build-components.ps1

# Linux/macOS
./scripts/build-components.sh
```

### Run Demo Locally
```bash
cd src/oslc-selection-demo
python -m http.server 8080
# or
npx serve .
```

### Publish to Registry (with proper authentication)
```bash
cd src/oslc-postmessage-helper
npm publish --registry=https://npm.pkg.github.com

cd ../oslc-selection-webcomponent
npm publish --registry=https://npm.pkg.github.com
```

## Release Process

To create a new release:

1. Update version numbers in both `package.json` files
2. Commit and push changes
3. Create a GitHub release with a tag like `v1.0.1`
4. The workflow will automatically publish the versioned packages

## Troubleshooting

### Common Issues

1. **Authentication failures**: Ensure `GITHUB_TOKEN` has package write permissions
2. **Build failures**: Check that all dependencies are properly specified
3. **Pages deployment issues**: Verify the demo builds correctly locally first

### Debug Information

Each job provides detailed logs. Check the Actions tab for:
- Build output
- Test results
- Publishing status
- Deployment logs

### Local Testing

Before pushing, test the build locally:

```bash
# Test the build process
npm ci
npm run build
npm run test

# Test the demo
cd src/oslc-selection-demo
# Verify all files are present and demo works
```

## Security

- Secrets are managed through GitHub Actions
- Package registry uses GitHub token authentication
- No sensitive information is stored in the repository
- All builds run in isolated environments

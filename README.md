# AWS CI/CD Project — S3 + CloudFront

This repo contains a complete demo for a CI/CD pipeline that builds, tests, and deploys a static website to **S3** and serves it via **CloudFront** using **GitHub Actions** and **Terraform**.

## Structure
```
aws-s3-cloudfront-cicd/
|-- app/                       # simple Node-based static site
|   |-- index.html
|   |-- build.js
|   |-- test.js
|   |-- server.js
|   |-- package.json
|-- iac/                       # Terraform code
|   |-- provider.tf
|   |-- variables.tf
|   |-- main.tf
|-- .github/workflows/
|   |-- deploy.yml
|-- README.md
```

## How it works (end-to-end)
1. **Terraform** (`iac/main.tf`) provisions:
   - S3 bucket with website config
   - S3 bucket policy
   - CloudFront distribution

2. **GitHub Actions** (`.github/workflows/deploy.yml`) runs on push to `main`:
   - Checks out code
   - Runs `npm test` and `npm run build` in `app/`
   - Syncs `app/build` to the S3 bucket specified in GitHub Secrets
   - Invalidates CloudFront cache

## Setup & Deploy (local)

1. Install Terraform & AWS CLI
2. Configure AWS CLI:
   ```bash
   aws configure
   ```
3. Create a GitHub repo and push this project.
4. Create GitHub Secrets in the repo settings (Actions -> Secrets):
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `S3_BUCKET_NAME` (example: my-demo-webapp-bucket-ajith-unique-12345)
   - `CLOUDFRONT_ID` (the distribution id after Terraform apply)

## Terraform (iac)

Run:
```bash
cd iac
terraform init
terraform apply -auto-approve
```

After apply, note outputs:
- `s3_website_url`
- `cloudfront_url`

Copy the CloudFront distribution ID from the AWS Console and add it to GitHub Secrets `CLOUDFRONT_ID`.

## CI/CD (GitHub Actions)

On push to `main`, the workflow will:
- Install Node.js, run tests, build the static site
- Upload build artifacts to S3
- Invalidate CloudFront cache so new content appears immediately

## Rollback strategy
- For quick rollback, revert the commit on GitHub to a previous commit and push — Actions will redeploy the old build to S3.
- For infra rollback, use `terraform destroy` (not recommended in prod).

## Notes & Security
- Bucket name must be globally unique. Update `iac/variables.tf` or set `S3_BUCKET_NAME` secret accordingly.
- Use least-privilege for the AWS keys; prefer an IAM user with S3 and CloudFront permissions.

---

---
title: GitHub Pages로 배포하기
date: 2026-03-15
category: Tech
tag: Dev
excerpt: Vue 프로젝트를 GitHub Pages에 배포하는 방법을 정리합니다.
---

GitHub Pages는 정적 사이트를 무료로 호스팅할 수 있는 서비스입니다.

## 빌드

`npm run build` 명령어로 프로덕션 빌드를 생성합니다. `dist` 폴더에 결과물이 생성됩니다.

## 배포

GitHub Actions를 사용하면 push할 때마다 자동으로 빌드하고 배포할 수 있습니다.

1. `.github/workflows` 폴더에 워크플로우 파일을 생성합니다.
2. push 이벤트에 빌드 및 배포 스텝을 추가합니다.
3. GitHub 저장소 설정에서 Pages 소스를 GitHub Actions로 지정합니다.

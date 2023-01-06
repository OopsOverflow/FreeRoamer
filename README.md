![TS](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)
![AWS](
https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
<br />
![React.js](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

<h1 align="center">
FreeRoamer
</h1>

<h6 align="center">
a platform for hikers and outdoor enthusiasts to share and discover new trails.
<br />
<a href="https://freeroamer.vercel.app/">View Demo</a>
·
<a href="https://github.com/OopsOverflow/FreeRoamer/issues">Report Bug</a>

</h6>
<div align="center">
<img src="public/logo.png" width="50%" height="50%" alt="logo">
</div>

---

<br />

## Features
- Upload GPX tracks and share them with others
- Share photos and thoughts about your tracks
- Like and comment on other users' posts
- Realtime position tracking
- Stats about your tracks, including average elevation gain and length

<br />

## Built With
- [Next.js](https://nextjs.org/) hosted on [Vercel](https://vercel.com/)
- [Chakra UI](https://chakra-ui.com/)
- [Mapbox](https://www.mapbox.com/)
- [Turf.js](https://turfjs.org/)
- [AWS S3](https://aws.amazon.com/s3/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/) hosted on [Supabase](https://supabase.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [TypeScript](https://www.typescriptlang.org/) 🖤

<br />

## Performance Improvements
- [x] SSG, ISR and SSR using Next.js
- [x] Blob storage for images and GPX files using AWS S3
- [x] Serverless functions
- [ ] Deploy Serveless to the Edge
- [ ] Lazy loading of images


<br />

## Getting Started

To get a local copy up and running follow these simple steps:

1. Install NPM packages
```sh
npm install
```
2. Create a .env.local file in the root directory and add the following environment variables:
```sh
NEXTAUTH_URL=http://localhost:3000
MAPBOX_TOKEN=
DATABASE_URL=
AWS_BUCKET_ACCESS_KEY_ID=
AWS_BUCKET_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
AWS_BUCKET_REGION=
```

3. Run the development server
```sh
npm run dev
```

<br />

## Gallery







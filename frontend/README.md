# Ángela Sánchez | Full Stack Portfolio

Hi there! I'm Ángela, and this is the source code for my personal portfolio. 

To be completely honest, I didn't want to build just another static presentation site. I wanted to use this as an opportunity to build something a bit more robust, so I developed a full-stack application with its own custom-built Content Management System (CMS). 

The entire design follows a brutalist aesthetic: high contrast, hard edges, and straight to the point.

## What's under the hood?

The project is split into two main parts: the public-facing website and a private admin dashboard where I manage my database of projects without having to touch the code.

**Frontend:**
- Built with React 18 and Vite.
- Tailwind CSS for the brutalist styling and responsive design.
- React Router for seamless navigation without reloading.
- Fully bilingual (English / Spanish) managed directly through the app's state.

**Backend & Data:**
- Custom REST API built with Node.js and Express.
- Supabase (PostgreSQL) for the database.
- Admin routes protected via JWT authentication.
- Deployed on Render.

## Want to run it locally?

If you want to clone the repo and poke around the code, here are the quick steps to get it running:

### 1. Clone the repo:
```bash
git clone [https://github.com/angelasandom/CMS-PORTAFOLIO.git](https://github.com/angelasandom/CMS-PORTAFOLIO.git)
cd CMS-PORTAFOLIO
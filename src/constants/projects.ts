export const projects = [
  {
    id: 10,
    title: "grainr",
    description: "An R package for spatial field trial analysis in the Australian grains industry. Implements AR1×AR1 spatial mixed models via nlme — the industry-standard approach for variety performance trials — alongside utilities for experimental design validation, spatial residual diagnostics, and publication-ready field heatmaps. CRAN-ready: roxygen2 docs on every export, 29 passing testthat tests, GitHub Actions CI across 4 OS/R combinations, and an auto-deployed pkgdown site.",
    tag: "SOFTWARE",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    links: { repo: "https://github.com/goosetea04/grainr" }
  },
  {
    id: 11,
    title: "Patient Management API",
    description: "A healthcare REST API built with ASP.NET Core 8, featuring JWT authentication, role-based access control for Admin, Doctor, and Receptionist roles, and HIPAA-aware audit logging. Manages patients, doctors, appointments, and medical records across a clean 4-layer architecture. Includes double-booking prevention, soft deletes for data retention compliance, auto-generated Swagger docs, and 52 unit tests written with xUnit and FluentAssertions.",
    tag: "SOFTWARE",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    links: { repo: "https://github.com/goosetea04/patientManagementAPI" }
  },
  {
    id: 12,
    title: "EDGAR Financial Analysis Platform",
    description: "A comprehensive financial analysis tool that leverages SEC EDGAR database data to provide deep insights into company financials and market trends. Enables users to analyze financial statements, compare company metrics, track regulatory filings, and extract actionable intelligence from publicly available financial data for investment research and due diligence.",
    tag: "SOFTWARE",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    links: { repo: "https://github.com/goosetea04/EDGAR-FInancial-Analysis" }
  },
  {
    id: 13,
    title: "DAEWOO Steel Factory Analytics Dashboard",
    description: "An interactive Power BI dashboard for DAEWOO Steel Factory that visualizes production metrics, equipment performance, and operational efficiency. Provides real-time insights into manufacturing processes, quality control data, and resource utilization to support data-driven decision-making across the production facility.",
    tag: "SOFTWARE",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    links: { repo: "https://github.com/goosetea04/DAEWOO-Power-BI" }
  },
  {
    id: 14,
    title: "Pookie Platforms",
    description: "Pookie is an All-in-One Career Analytics platform that connects early-career job seekers with opportunities at small and medium-sized businesses. Instead of scrolling through endless generic job listings, Pookie analyzes your profile, skills, and goals to deliver personalized job recommendations—including opportunities you didn't know existed. For SMBs, we make it easier to find qualified early-career talent without the need for massive recruiting budgets. Founded by students who've lived the job search struggle, Pookie solves a real problem: great early-career talent and meaningful SMB opportunities often miss each other. We use intelligent matching to bridge that gap, making career discovery smarter and more accessible for both job seekers and the businesses that need them.",
    tag: "SOFTWARE",
    image: "https://www.pookieplatform.com/_next/image?url=%2Fimages%2Fheroimage.png&w=1080&q=75",
    links: {demo: "https://pookieplatform.com" }
  },
  {
    id: 15,
    title: "SOLIDTASKS",
    description: "solidtasks is a Flutter-based task management app that leverages decentralized data storage and fine-grained access control using Solid Pods. This project empowers users to securely create, store, and share tasks while maintaining full ownership and privacy over their data.",
    tag: "SOFTWARE",
    image: "https://pods.acp.solidcommunity.au/.well-known/css/images/solid.svg",
    links: { repo: "https://github.com/goosetea04/solidtasks"} // Demo link could be ArtStation
  },
  {
    id: 16,
    title: "CLIMATE DIFFUSION",
    description: "This project implements a parallel 2D climate diffusion model using Python, NumPy, mpi4py, and optional NetCDF output. It demonstrates how surface temperature fields can be evolved over time using a simple physical scheme and MPI-based domain decomposition.",
    tag: "SOFTWARE",
    image: "https://instituthijau.id/wp-content/uploads/2024/09/Climate-Change-Threat-or-Opportunity-@aura-emagazine.jpg",
    links: { repo: "https://github.com/goosetea04/climate-diffusion-mpi"}
  },
  {
    id: 17,
    title: "Water Modeller",
    description: "This is a small-but-serious shallow water model written in modern Fortran. It solves a simplified set of equations used in atmospheric and ocean modelling, so it’s a nice mini version of what “real” climate models do.",
    tag: "SOFTWARE",
    image: "https://www.spiceworks.com/wp-content/uploads/2023/06/pasted-image-0-7-1024x586.png",
    links: {demo: "https://github.com/goosetea04/watermodel" }
  },
  {
    id: 18,
    title: "GLB Viewer webapp",
    description: "A lightweight web-based 3D model viewer built with HTML and Three.js for displaying GLB (GL Binary) files directly in the browser. This project serves as a simple, no-frills solution for previewing and interacting with 3D models without requiring complex setups or installations.",
    tag: "Graphic design",
    image: "https://i.ytimg.com/vi/wiiSIHvIlNw/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGH8gEyh8MA8=&rs=AOn4CLA9F-y9shZhf4hRU_7ZvyMbTIxZEQ",
    links: { repo: "https://github.com/goosetea04/timespace_glb"} // Demo link could be ArtStation
  },
  {
    id: 19,
    title: "POLARIS - Crisis Management",
    description: "Polaris is a comprehensive solution designed to aid relief organizations in managing crises, including natural disasters, humanitarian emergencies, and warzones. It provides a map-based interface to monitor supply and evacuation lines. The backend that we have is used to identify geographical challenges, and reroute to safer paths, ensuring efficient and effective disaster response.",
    tag: "SOFTWARE",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqUDTU1TSjWloBLQdY8heVsAIFPXUk6cfV0w&s",
    links: { repo: "https://github.com/goosetea04/polaris-FE-BE"}
  },
  {
    id: 20,
    title: "Self-Supervised Image Segmentation",
    description: "A custom implementation of self-supervised image segmentation using deep learning techniques. This project explores automated image segmentation without requiring labeled training data, leveraging the inherent structure within individual images.",
    tag: "Data Science",
    image: "https://github.com/goosetea04/Mini-Project/blob/main/minipro.jpg.png?raw=true",
    links: { repo: "https://github.com/goosetea04/Mini-Project/blob/main/minipro.jpg.png"}
  }
];
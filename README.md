# NMIMS College Portal

## Introduction

This repository contains the code for a comprehensive college portal developed using React, Tailwind CSS, and Firebase technologies.
The portal serves as a pivotal platform catering to both faculty and student needs, featuring seamless signup/sign-in functionalities and personalized dashboards.
Central to this portal is a robust database housing essential academic and personal information of students, which is efficiently retrieved and displayed on respective dashboards for both students and faculty members.

## Screenshots

Here are some screenshots of the web application:


<div align="center">
  <img src="https://github.com/PrabirKalwani/NMIMS-Student-Portal/assets/70889682/cabc3c26-c328-45c4-8777-1722a548ebaf" alt="Screenshot 1" width="350"/>
  <img src="https://github.com/PrabirKalwani/NMIMS-Student-Portal/assets/70889682/4256b466-2177-429a-8432-4030636e76bbg" alt="Screenshot 2" width="325"/>
</div>

<div align="center">
  <img src="https://github.com/PrabirKalwani/NMIMS-Student-Portal/assets/70889682/1021ca3c-a0eb-4015-8229-302cfcc03072" alt="Screenshot 3" width="500"/>
</div>


## Deployment 

To deploy the application, follow these steps:

```bash
# Clone the repository
git clone https://github.com/PrabirKalwani/NMIMS-Student-Portal.git

# Navigate to the project directory
cd NMIMS-Student-Portal

# Install dependencies using pnpm
pnpm install

```

Lets Create A .ENV file in Src Folder of your application 

```bash
# Add your Firebase configuration details in .env file

VITE_APIKEY=your-api-key
VITE_AUTHDOMAIN=your-auth-domain
VITE_PROJECTID=your-project-id
VITE_STORAGEBUCKET=your-storage-bucket
VITE_MESSAGESENDERID=your-messaging-sender-id
VITE_APPID=your-app-id
VITE_MEASUREMENTID=your-measurement-id
```

# Run the application
```bash
pnpm dev
```

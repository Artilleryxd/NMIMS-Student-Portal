# NMIMS College Portal

## Introduction

This repository contains the code for a comprehensive college portal developed using React, Tailwind CSS, and Firebase technologies.
The portal serves as a pivotal platform catering to both faculty and student needs, featuring seamless signup/sign-in functionalities and personalized dashboards.
Central to this portal is a robust database housing essential academic and personal information of students, which is efficiently retrieved and displayed on respective dashboards for both students and faculty members.

## Demo

Here are some screenshots of the college portal:

![image](https://github.com/PrabirKalwani/NMIMS-Student-Portal/assets/140951916/39f3dfda-52bd-4741-ba44-fc121b716ea7)

![image](https://github.com/PrabirKalwani/NMIMS-Student-Portal/assets/140951916/62c9ab45-1c9c-4f83-b932-501a55af4b73)

![image](https://github.com/PrabirKalwani/NMIMS-Student-Portal/assets/140951916/bc2f6c53-a0c2-488a-b6c7-17ee05bfe177)

![image](https://github.com/PrabirKalwani/NMIMS-Student-Portal/assets/140951916/9e43a7c7-6cab-4b2b-80fb-2dbde8be65df)



## Deployment 

To deploy the application, follow these steps:

```bash
# Clone the repository
git clone https://github.com/PrabirKalwani/NMIMS-Student-Portal.git

# Navigate to the project directory
cd NMIMS-Student-Portal

# Install dependencies using pnpm
pnpm install

# Add your Firebase configuration details in .env file

Make sure to replace your-api-key, your-auth-domain, and other placeholders with your actual Firebase credentials.
VITE_APIKEY=your-api-key
VITE_AUTHDOMAIN=your-auth-domain
VITE_PROJECTID=your-project-id
VITE_STORAGEBUCKET=your-storage-bucket
VITE_MESSAGESENDERID=your-messaging-sender-id
VITE_APPID=your-app-id
VITE_MEASUREMENTID=your-measurement-id

# Run the application
pnpm dev

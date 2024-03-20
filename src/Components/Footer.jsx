import { Copyright } from "lucide-react";

const Footer = () => {
    return (
        <div className="flex flex-row gap-3 justify-center items-center w-full h-16 px-12 border-t fixed bottom-0 bg-gray-900">
            <Copyright />
            <p>Copyright 2024 | NMIMS</p>
        </div>
    );
};

export default Footer;

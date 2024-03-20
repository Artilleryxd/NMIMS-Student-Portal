import { Copyright } from "lucide-react";

const Footer = () => {
    return (
        <div>
            <div className="w-full h-16"></div>
            <div className="flex flex-row gap-3 justify-center items-center w-full h-16 px-12 border-t fixed bottom-0 bg-background">
                <Copyright />
                <p>Copyright 2024 | NMIMS</p>
            </div>
        </div>
    );
};

export default Footer;

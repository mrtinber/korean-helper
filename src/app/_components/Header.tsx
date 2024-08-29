import Image from "next/image";
import { FireTrigram } from "./icons/FireTrigram";
import { HeavenTrigram } from "./icons/HeavenTrigram";
import { WaterTrigram } from "./icons/WaterTrigram";
import { EarthTrigram } from "./icons/EarthTrigram";

export const Header = () => {
    return (
        <div className="flex items-center gap-8">
            <Image src="/taegeuk.png" alt="Taegeuk" width={72} height={32} />
            <p className="font-mono font-bold text-4xl">Korean Helper</p>
            <FireTrigram />
            <HeavenTrigram />
            <WaterTrigram />
            <EarthTrigram />
        </div>
    );
};

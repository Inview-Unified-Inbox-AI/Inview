import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { FamilyReceiveComponent } from "@repo/ui/components/family-receive-button";
import NavigationMenuDemo from "./sample-ui/nav-menu";
import HeroSection from "@/components/HeroSection";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <div>
      <header className="sticky top-0 z-40 bg-background/70 backdrop-blur-md">
        <NavigationMenuDemo />
      </header>
      <HeroSection />

      <div className="h-screen" />
    </div>
  );
}

import React from "react";
import profileImage from "../assets/profile.jpeg";
import UserCard from "../components/UserCard";

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <div>
      <UserCard
        name="JaeSeo Kim"
        career="FrontEnd Developer"
        quote={"Hello Webpack SWC React TypeScript!"}
        img={{
          src: profileImage,
          alt: `user profile image`,
        }}
        links={[
          {
            type: "42",
            link: "https://profile.intra.42.fr/users/jaeskim",
          },
          {
            type: "github",
            link: "https://github.com/JaeSeoKim",
          },
          {
            type: "facebook",
            link: "https://www.facebook.com/devjaeseo/",
          },
          {
            type: "instagram",
            link: "https://www.instagram.com/jaeseo0220/",
          },
        ]}
      />
    </div>
  );
};

export default Home;

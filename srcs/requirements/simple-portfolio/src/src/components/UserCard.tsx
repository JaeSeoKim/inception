import React from "react";
import styles from "./UserCard.module.scss";

import FtLogo from "../assets/42.svg";
import FaceBookLogo from "../assets/facebook.svg";
import GitHubLogo from "../assets/github.svg";
import InstagramLogo from "../assets/instagram.svg";

export interface UserCardProps {
  img: {
    src: string;
    alt: string;
  };
  name: string;
  career: string;
  quote: string;

  links?: IconProps[];
}

interface IconProps {
  type: "42" | "facebook" | "github" | "instagram";
  link: string;
}

const Icon: React.FC<IconProps> = ({ type, link }) => {
  const Icon = (() => {
    switch (type) {
      case "42":
        return FtLogo;
      case "facebook":
        return FaceBookLogo;
      case "instagram":
        return InstagramLogo;
      case "github":
      default:
        return GitHubLogo;
    }
  })();

  return (
    <a href={link}>
      <Icon className={styles.icon} />
    </a>
  );
};

const UserCard: React.FC<UserCardProps> = ({
  img,
  name,
  career,
  quote,
  links = [],
}) => {
  return (
    <figure className={styles.conatiner}>
      <img className={styles.userImg} src={img.src} alt={img.alt} />
      <div className={styles.infoSection}>
        <blockquote className={styles.quote}>
          <p>“{quote}”</p>
        </blockquote>
        <figcaption className={styles.figcaption}>
          <div className={styles.name}>{name}</div>
          <div className={styles.career}>{career}</div>
        </figcaption>
        <div className={styles.links}>
          {links.map((link) => (
            <Icon key={`${link.type}-${link.link}`} {...link} />
          ))}
        </div>
      </div>
    </figure>
  );
};

export default UserCard;

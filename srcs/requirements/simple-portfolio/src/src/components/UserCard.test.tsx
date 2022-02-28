import React from "react";
import { render } from "@testing-library/react";
import UserCard, { UserCardProps } from "./UserCard";
import styles from "./UserCard.module.scss";

test("test render UserCard", () => {
  const props: UserCardProps = {
    name: "JaeSeo Kim",
    career: "FrontEnd Developer",
    quote: "Hello Webpack SWC React TypeScript!",
    img: {
      src: "test image src",
      alt: `user profile image`,
    },
    links: [{ type: "42", link: "https://profile.intra.42.fr/users/jaeskim" }],
  };

  const { container } = render(<UserCard {...props} />);

  const name = container.querySelector(`[class="${styles.name}"]`)?.innerHTML;
  expect(name).toBe(props.name);

  const career = container.querySelector(
    `[class="${styles.career}"]`
  )?.innerHTML;
  expect(career).toBe(props.career);

  const quote = container.querySelector(`[class="${styles.quote}"]`)?.innerHTML;
  expect(quote?.includes(props.quote)).toBeTruthy();

  const img = container.querySelector(`[class="${styles.userImg}"]`);
  expect(img?.getAttribute("src")).toBe(props.img.src);
  expect(img?.getAttribute("alt")).toBe(props.img.alt);

  const links = container.querySelector(`[class="${styles.links}"]`)?.children;

  expect(links).not.toBeNull();

  for (let i = 0; i < (links?.length ?? 0); ++i) {
    const icon = links?.item(i);
    expect(icon?.getAttribute("href")).toBe(props.links?.[i].link);
  }
});

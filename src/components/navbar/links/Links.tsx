"use client";

import { useState } from "react";
import NavLink from "./navlink/NavLink";
import Image from "next/image";
import { handleLogout } from "@/lib/action";
import styles from "./links.module.css";

const links = [
  {
    title: "Homepage",
    path: "/",
  },
  {
    title: "Chats",
    path: "/chats",
  },
  {
    title: "Sale",
    path: "/sale",
  }
];

const Links = ({session}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session?.user ? (
          <>
            <div className={styles.userProfile}>{session?.user?.name[0].toUpperCase()}</div>
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;

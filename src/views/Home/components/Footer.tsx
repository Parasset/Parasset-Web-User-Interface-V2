//@ts-nocheck
import React, { useMemo, useState } from "react";
import Spacer from "../../../components/Spacer";
import useIsMobile from "../../../hooks/useIsMobile";
import telegram from "../../../assets/svg/telegram_icon.svg";
import telegramActive from "../../../assets/svg/telegram_icon(1).svg";
import audit from "../../../assets/svg/audit_icon.svg";
import auditActive from "../../../assets/svg/audit_icon(1).svg";
import docs from "../../../assets/svg/docs_icon.svg";
import docsActive from "../../../assets/svg/docs_icon(1).svg";
import github from "../../../assets/svg/github_icon.svg";
import githubActive from "../../../assets/svg/github_icon(1).svg";
import medium from "../../../assets/svg/medium_icon.svg";
import mediumActive from "../../../assets/svg/medium_icon(1).svg";
import twitter from "../../../assets/svg/twitter_icon.svg";
import twitterActive from "../../../assets/svg/twitter_icon(1).svg";
import whitepaper from "../../../assets/svg/whitepaper_icon.svg";
import whitepaperActive from "../../../assets/svg/whitepaper_icon(1).svg";

const Icon = ({ name, img, imgActive, link }) => {
  const [hover, setHover] = useState(false);

  const toggleHover = () => {
    setHover(!hover);
  };

  return (
    <div style={{ paddingRight: "10px" }}>
      <a
        className="icon"
        href={link}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
      >
        <img src={imgActive} alt={name} hidden={!hover} />
        <img src={img} alt={name} hidden={hover} />
      </a>
    </div>
  );
};

const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  const links = useMemo(() => {
    return [
      {
        name: "telegram",
        img: telegram,
        imgActive: telegramActive,
        link: "https://t.me/parasset_chat",
      },
      {
        name: "twitter",
        img: twitter,
        imgActive: twitterActive,
        link: "https://twitter.com/Parasset2021",
      },
      {
        name: "github",
        img: github,
        imgActive: githubActive,
        link: "https://github.com/Parasset",
      },
      {
        name: "medium",
        img: medium,
        imgActive: mediumActive,
        link: "https://parasset2021-55646.medium.com/",
      },
      {
        name: "docs",
        img: docs,
        imgActive: docsActive,
        link: "https://github.com/Parasset/Parasset-Doc",
      },
      {
        name: "whitepaper",
        img: whitepaper,
        imgActive: whitepaperActive,
        link:
          "https://github.com/Parasset/Parasset-Doc/blob/main/WhitePaper.pdf",
      },
      {
        name: "audit",
        img: audit,
        imgActive: auditActive,
        link:
          "https://github.com/Parasset/Parasset-Doc/blob/main/Certik_Parasset_final.pdf",
      },
    ];
  }, []);
  return (
    <>
      <Spacer />
      <div className={`width-100 ${isMobile ? "" : "flex-jc-center"} `}>
        {isMobile ? <Spacer size="mmd" /> : null}

        {isMobile ? <Spacer size="mmd" /> : null}
        <div
          className={` flex-wrap ${
            isMobile ? "wing-blank flex-jc-center" : "flex-jc-start flex1"
          } `}
        >
          {links.map((item) => (
            <Icon
              key={item.name}
              img={item.img}
              imgActive={item.imgActive}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Footer;

import styles from "./styles.module.css";
import { validateString, alwaysString } from '../../../helpers'
import { useTranslation } from 'react-i18next';
import { paths } from "./Footer_001.messages";

export const Footer = () => {
  const { t: translatable } = useTranslation();
  const safePath = (path) => alwaysString(paths[path]);
  return (
    <section className={styles.iepFooter}>
      <div className={styles.iepContainer}>
        <div className={styles.iepTop}>
          <a
            aria-label={translatable('footer_001.logo-link.arial-label')}
            className={styles.iepLogo}
            href={safePath('footer_001.logo-link.href')}
          >
            <img
              className={styles.iepLogoImg}
              loading="lazy"
              decoding="async"
              src={safePath('footer_001.logo.src')}
              alt={translatable('footer_001.logo.alt')}
              width={168}
              height={48}
            />
          </a>
          <ul className={styles.iepUl}>
            {[
              {
                label: translatable('footer_001.footer-link.home.text'),
                href: safePath('footer_001.footer-link.home.href'),
              },
              {
                label: translatable('footer_001.footer-link.about.text'),
                href: safePath('footer_001.footer-link.about.href'),
              },
              {
                label: translatable('footer_001.footer-link.services.text'),
                href: safePath('footer_001.footer-link.services.href'),
              },
              {
                label: translatable('footer_001.footer-link.donations.text'),
                href: safePath('footer_001.footer-link.donations.href'),
              },
              {
                label: translatable('footer_001.footer-link.events.text'),
                href: safePath('footer_001.footer-link.events.href'),
              },
              {
                label: translatable('footer_001.footer-link.blog.text'),
                href: safePath('footer_001.footer-link.blog.href'),
              },
              {
                label: translatable('footer_001.footer-link.contact.text'),
                href: safePath('footer_001.footer-link.contact.href'),
              }
            ].map(({ label, href }, index) => (
              <li key={index} className={styles.iepLi}>
                <a href={href} className={styles.iepLink}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.iepBottom}>
          {/*Social*/}
          <ul className={styles.iepSocial}>
            <li className={styles.iepSocialLi}>
              <a
                href=""
                className={styles.iepSocialLink}
                aria-label="facebook"
                target="_blank"
                rel="noopener"
              >
                <img
                  className={styles.iepSocialIcon}
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/facebook-1a.svg"
                  alt="icon"
                  loading="lazy"
                  decoding="async"
                  width={12}
                  height={12}
                  aria-hidden="true"
                />
              </a>
            </li>
            <li className={styles.iepSocialLi}>
              <a
                href=""
                className={styles.iepSocialLink}
                aria-label="twitter"
                target="_blank"
                rel="noopener"
              >
                <img
                  className={styles.iepSocialIcon}
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/twitter-1a.svg"
                  alt="icon"
                  loading="lazy"
                  decoding="async"
                  width={12}
                  height={12}
                  aria-hidden="true"
                />
              </a>
            </li>
            <li className={styles.iepSocialLi}>
              <a
                href=""
                className={styles.iepSocialLink}
                aria-label="instagram"
                target="_blank"
                rel="noopener"
              >
                <img
                  className={styles.iepSocialIcon}
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/instagram-1a.svg"
                  alt="icon"
                  loading="lazy"
                  decoding="async"
                  width={12}
                  height={12}
                  aria-hidden="true"
                />
              </a>
            </li>
            <li className={styles.iepSocialLi}>
              <a
                href=""
                className={styles.iepSocialLink}
                aria-label="twitter"
                target="_blank"
                rel="noopener"
              >
                <img
                  className={styles.iepSocialIcon}
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/youtube-1a.svg"
                  alt="icon"
                  loading="lazy"
                  decoding="async"
                  width={12}
                  height={12}
                  aria-hidden="true"
                />
              </a>
            </li>
          </ul>
          <span className={styles.iepCopyright}>
            © Copyright 2023 -{" "}
            <a href="" className={styles.iepCopyrightLink}>
              Stitch Non-profit Charity
            </a>
          </span>
        </div>
      </div>
    </section>
  )
}

import * as React from 'react';
import styles from './Hero.module.scss';
import type { IHeroProps } from './IHeroProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Hero extends React.Component<IHeroProps> {
  public render(): React.ReactElement<IHeroProps> {
    const {
      tagText,
      title,
      subtitle,
      buttonText,
      buttonUrl,
      backgroundImageUrl
    } = this.props;

    const sectionStyle: React.CSSProperties = backgroundImageUrl
      ? { backgroundImage: `linear-gradient(0deg, rgba(17,17,17,.65), rgba(17,17,17,.15)), url("${backgroundImageUrl}")` }
      : {};

    return (
      <section className={styles.hero} style={sectionStyle}>
        <div className={styles.content}>
          {tagText && <span className={styles.tag}>{escape(tagText)}</span>}
          {title && <h1 className={styles.title}>{escape(title)}</h1>}
          {subtitle && <p className={styles.subtitle}>{escape(subtitle)}</p>}
          {buttonText && (
            <a className={styles.button} href={buttonUrl || '#'}>
              {escape(buttonText)}
              <svg className={styles.buttonIcon} viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>
      </section>
    );
  }
}

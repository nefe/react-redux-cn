import React, { useEffect } from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useThemeContext from '@theme/hooks/useThemeContext';
import styles from './styles.module.css';

const features = [
  {
    content: (
      <p>
        React Redux 由 Redux 官方团队维护，并{' '}
        <strong>与 Redux 和 React 最新的 API 保持同步</strong>。
      </p>
    ),
    image: <img src="img/noun_Certificate_1945625.svg" />,
    imageAlign: 'top',
    title: '官方维护',
  },
  {
    content: (
      <p>
        <strong>旨在与 React 的组件模型一起使用</strong>。你来定义如何从 Redux
        中提取组件所需的数据，然后组件即可根据需要自动更新。
      </p>
    ),
    image: <img src="img/noun_Check_1870817.svg" />,
    imageAlign: 'top',
    title: '可预测',
  },
  {
    content: (
      <p>
        提供开箱即用的 API <strong>实现组件与 Redux Store 交互</strong>
        ，避免手动编写代码实现逻辑。
      </p>
    ),
    image: <img src="img/noun_Box_1664404.svg" />,
    imageAlign: 'top',
    title: '封装',
  },
  {
    content: (
      <p>
        内部自动做了<strong>复杂的性能优化</strong>
        ，帮助组件仅在它需要的数据变化后才重新渲染。
      </p>
    ),
    image: <img src="img/noun_Rocket_1245262.svg" />,
    imageAlign: 'top',
    title: '高性能',
  },
];

const otherLibraries = [
  {
    content: 'JS 应用的状态容器，提供可预测的状态管理',
    title: 'Redux',
    link: 'https://cn.redux.js.org',
    image: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        data-icon="external-link-square-alt"
        data-prefix="fas"
        viewBox="0 0 448 512"
      >
        <path d="M448 80v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48zm-88 16H248.029c-21.313 0-32.08 25.861-16.971 40.971l31.984 31.987L67.515 364.485c-4.686 4.686-4.686 12.284 0 16.971l31.029 31.029c4.687 4.686 12.285 4.686 16.971 0l195.526-195.526 31.988 31.991C358.058 263.977 384 253.425 384 231.979V120c0-13.255-10.745-24-24-24z"></path>
      </svg>
    ),
  },
];

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://buttons.github.io/buttons.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <div className={styles.title}>
            <img
              src="img/redux_white.svg"
              alt="Redux logo"
              width="100"
              height="100"
            />
            <h1 className={`${styles.projectTitle} hero__title`}>
              {siteConfig.title}
            </h1>
          </div>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--secondary button--lg',
                styles.getStarted
              )}
              to={useBaseUrl('introduction/getting-started')}
            >
              入门 React Redux
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className={classnames('container', styles.featureBlock)}>
              <div className="row">
                {features.map(({ image, title, content }, idx) => (
                  <div key={idx} className={classnames('col', styles.feature)}>
                    {image && (
                      <div className={`text--center ${styles.blockImage}`}>
                        {image}
                      </div>
                    )}
                    <h2 className={`text--center ${styles.featureTitle}`}>
                      {title}
                    </h2>
                    <div className={styles.featureContent}>{content}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        {otherLibraries && otherLibraries.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                <div className="col">
                  <h2 className={`text--center ${styles.secondTitle}`}>
                    Redux 团队开发的其他库
                  </h2>
                </div>
              </div>
              <div className="row">
                {otherLibraries.map(({ image, title, content, link }, idx) => (
                  <div
                    key={idx}
                    className={classnames('col col--6', styles.feature)}
                  >
                    <h2 className="text--center">
                      <a href={link} className={styles.featureAnchor}>
                        {title}
                        {image}
                      </a>
                    </h2>
                    <p className="text--center">{content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;

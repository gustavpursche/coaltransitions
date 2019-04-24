import Link from 'gatsby-link';
import React from 'react';

import style, { linkTitle } from './style';
import Tag from '../../tag';

export default ({
  acf: { author },
  tags,
  title,
  featuredImage,
  url,
  onFilter
}) => (
  <div className="publication">
    <style jsx>{style}</style>
    {linkTitle.styles}

    <header className="header">
      <h2 className="title">
        <Link to={url} className={linkTitle.className}>
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </Link>
      </h2>

      {featuredImage && featuredImage.localFile && (
        <div className="cover-image-container">
          <picture className="cover-image">
            <source
              type="image/webp"
              srcSet={featuredImage.localFile.childImageSharp.fluid.srcSetWebp}
            />
            <source
              type="image/png"
              srcSet={featuredImage.localFile.childImageSharp.fluid.srcSet}
            />

            <img
              src={featuredImage.localFile.childImageSharp.fluid.src}
              alt=""
            />
          </picture>
        </div>
      )}
    </header>

    {author && (
      <ul>
        {author.map(({ name }) => (
          <li>
            <Link
              to={`/publications/?authors=${name}`}
              onClick={event => {
                event.preventDefault();
                onFilter({ authors: [name] });
              }}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    )}

    {tags && (
      <ul>
        {tags.map(({ slug, name }) => (
          <li>
            <Tag
              to={`/publications/?keywords=${slug}`}
              onClick={event => {
                event.preventDefault();
                onFilter({ tags: [slug] });
              }}
            >
              {name}
            </Tag>
          </li>
        ))}
      </ul>
    )}
  </div>
);

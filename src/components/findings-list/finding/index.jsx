import classnames from 'classnames';
import Link from 'gatsby-link';
import React from 'react';
import { graphql } from 'gatsby';

import ArrowIcon from '../../../../static/icons/arrow-alt-right.svg';
import Button from '../../button';
import Picture from '../../picture';
import style, { titleLink, imageLink, arrowIcon } from './style';

export default ({
  slug,
  title,
  figureCaption,
  featuredImage,
  acf: { intro, factNumber },
  theme
}) => {
  const url = `/findings/${slug}/`;

  return (
    <section
      className={classnames('argument', {
        'argument--has-theme-green': theme === 'green'
      })}
    >
      <style jsx>{style}</style>
      {titleLink.styles}
      {imageLink.styles}
      {arrowIcon.styles}

      <figure className="image-container">
        <Link to={url} className={imageLink.className} rel="nofollow">
          {featuredImage && featuredImage.localFile && (
            <Picture image={featuredImage.localFile} />
          )}
        </Link>

        <figcaption className="caption">{figureCaption}</figcaption>
      </figure>

      <div className="intro-container">
        <h2 className="title">
          <Link to={url} rel="nofollow" className={titleLink.className}>
            <span className="index">Finding {factNumber}</span>
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </Link>
        </h2>

        {intro && (
          <div className="intro" dangerouslySetInnerHTML={{ __html: intro }} />
        )}

        <Button to={url} rel="nofollow">
          Read more about this finding
          <ArrowIcon className={arrowIcon.className} />
        </Button>
      </div>
    </section>
  );
};

export const fragment = graphql`
  fragment findingListItem on wordpress__wp_findings {
    slug
    title
    featuredImage: featured_media {
      localFile {
        childImageSharp {
          fluid(maxWidth: 1200) {
            src
            srcSet
            srcSetWebp
          }
        }
      }
    }
    acf {
      intro
      factNumber: fact_number
    }
  }
`;
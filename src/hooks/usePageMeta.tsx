import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

interface UsePageMetaProps {
  title: string;
  description: string;
  thumbnail?: string;
}

export const usePageMeta = ({ title, description, thumbnail }: UsePageMetaProps) => {
  const location = useLocation();
  const url = `https://i5-team.github.io/bootrun-frontend${location.pathname}`;
  const defaultOgImage = 'https://i5-team.github.io/bootrun-frontend/assets/images/OG.jpg';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={thumbnail ?? defaultOgImage} />
    </Helmet>
  );
};
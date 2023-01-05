import CenteredMap from '@components/Maps/CenteredMap';
import { useEffect, useState } from 'react';

function PostMap({ mapUrl }: { mapUrl: string }) {
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    async function fetchMapData() {
      const response = await fetch(mapUrl);

      const data = await response.json();
      setGeojsonData(data);
    }

    fetchMapData().then((r) => console.log(r));
  }, [mapUrl]);

  return <CenteredMap width={'100%'} height={'400px'} geojson={geojsonData} />;
}

export default PostMap;

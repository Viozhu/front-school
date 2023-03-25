/* eslint-disable */
// @ts-nocheck
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.min.css';
import '@uppy/drag-drop/dist/style.css';
import { FileInput } from '@uppy/react';
import Tus from '@uppy/tus';
import * as styles from './styles';

interface UppyUploadProps {
  setImgUrl: (url: string) => void;
}

const TUS_ENDPOINT: string = 'https://tusd.tusdemo.net/files/';
function UppyUpload({ setImgUrl }: UppyUploadProps) {
  const uppy = new Uppy({
    autoProceed: true,
    restrictions: {
      maxFileSize: 3000000,
      allowedFileTypes: ['image/*'],
    },
  })
    .use(Tus, { endpoint: TUS_ENDPOINT, limit: 6 })
    .on('complete', (result) => {
      const url = result.successful[0].uploadURL;
      setImgUrl(url);
    });

  // .use(XHRUpload, {
  //   endpoint: 'https://xhr-server.herokuapp.com/upload',
  //   formData: true,
  //   method: 'POST',
  //   responseType: 'text',
  //   fieldName: 'files[]',
  // })

  return (
    <div>
      <p>Image: </p>
      <div className={styles.INPUT}>
        <FileInput uppy={uppy} />
      </div>
    </div>
  );
}

export default UppyUpload;

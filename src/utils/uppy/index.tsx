import Uppy from '@uppy/core';
import '@uppy/core/dist/style.min.css';
import '@uppy/drag-drop/dist/style.css';
import { FileInput } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import * as styles from './styles';

interface UppyUploadProps {
  // eslint-disable-next-line no-unused-vars
  setImgUrl: (url: string) => void;
}

function UppyUpload({ setImgUrl }: UppyUploadProps) {
  const uppy = new Uppy({
    autoProceed: true,
    restrictions: {
      maxFileSize: 3000000,
      allowedFileTypes: ['image/*'],
    },
  })
    .use(XHRUpload, {
      endpoint: 'https://xhr-server.herokuapp.com/upload',
      formData: true,
      method: 'POST',
      responseType: 'text',
      fieldName: 'files[]',
    })
    .on('complete', (result) => {
      const url = result.successful[0].uploadURL;
      setImgUrl(url);
    });

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

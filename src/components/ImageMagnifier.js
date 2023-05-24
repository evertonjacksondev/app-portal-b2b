import React from 'react';
import ReactImageMagnify from 'react-image-magnify';
const ImageRender = ({ src }) => {

    return (
        <div style={{ maxWidth: '600px', display: 'flex', }} >
            <ReactImageMagnify {...{
                smallImage: {
                    isFluidWidth: true,
                    isActivatedOnTouch: true,
                    hoverDelayInMs: true,
                    isEnlargedImagePortalEnabledForTouch: true,
                    src
                },
                largeImage: {
                    src,
                    width: 1200,
                    height: 1500,

                }
            }} />

        </div>
    );
};

export default ImageRender;

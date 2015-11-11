import Audio from 'components/Specimen/Audio/Audio';
import Button from 'components/Specimen/Button/Button';
import Code from 'components/Specimen/Code/Code';
import Color from 'components/Specimen/Color/Color';
import Html from 'components/Specimen/Html/Html';
import Hint from 'components/Specimen/Hint/Hint';
import Image from 'components/Specimen/Image/Image';
import Type from 'components/Specimen/Type/Type';
import Project from 'components/Specimen/Project/Project';
import Download from 'components/Specimen/Download/Download';
import ReactComponent from 'components/Specimen/ReactComponent/ReactComponent';
import Video from 'components/Specimen/Video/Video';

// Mostly replaced through Image/Video/Audio specimens
// import UISpec from 'components/Specimen/UISpec/UISpec';

// The used plugin is out of date at the moment
// import FramedCodeBlock from 'components/Specimen/Framed/FramedCodeBlock';

// As is adds mor confusion than benefit at the moment, images and icons should
// be displayed with either UISpec or Html for more complex needs
// import Icon from 'components/Specimen/Icon/Icon';

export default {
  audio: Audio,
  button: Button,
  code: Code,
  color: Color,
  html: Html,
  hint: Hint,
  image: Image,
  type: Type,
  project: Project,
  download: Download,
  react: ReactComponent,
  video: Video
};

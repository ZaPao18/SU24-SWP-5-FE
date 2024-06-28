import './loading.scss';

type Props = {
  loading: boolean;
};

const Loading = ({ loading }: Props) => {
  return (
    <div id='loading' className={loading ? '' : 'hide'}>
      <div id='loadingInnerWrapper'>
        <span id='load1'>.</span>
        <span id='load2'>.</span>
        <span id='load3'>.</span>
      </div>
    </div>
  );
};

export default Loading;

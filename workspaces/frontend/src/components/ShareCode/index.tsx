import './index.scss';

export const ShareCode = (props: { shareCode: string }) => {
  return (
    <div className='card green accent-1'>
      <div className='card-content black-text'>
        <span className='card-title '>Share Code</span>
        <h4>{props.shareCode}</h4>
      </div>
      <div className='card-action'>
        <a href='#' className='black-text '>
          Ok
        </a>
      </div>
    </div>
  );
};

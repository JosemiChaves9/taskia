export const ErrorCard = ({ error }: { error: string }) => {
  return <h5 className='card-panel red lighten-2'>{error}</h5>;
};

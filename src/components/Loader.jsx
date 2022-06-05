// export const Loader = () => {
//     <div>
//       <Oval color="#00BFFF" height={80} width={80} ariaLabel="loading" />;
//     </div>;
// }

import ReactLoading from 'react-loading';

export const Loader = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={100} width={100} />
);


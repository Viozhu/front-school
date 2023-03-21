import CardComponent from '../stylesComponents/Cards';
import { data } from './fakeData';
export default function HomeComponent(): JSX.Element {
  return (
    <div className="flex space-x-4 justify-center flex-wrap items-center p-12 ">
      {data.map((item) => (
        <CardComponent key={item.id} data={item} />
      ))}
    </div>
  );
}

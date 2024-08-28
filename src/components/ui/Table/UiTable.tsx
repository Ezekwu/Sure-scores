import styles from './table.module.scss';
import UiButton from '../Button/UiButton';
import UiIcon from '../Icon/UiIcon';

export interface Row extends Record<string, any> {
  id: string;
}

export interface Header {
  title: string;
  query: string;
}

interface Props {
  data: Row[];
  headers: Header[];
  leadItem?: boolean;
  options?: boolean;
}

export default function UiTable({data, headers, leadItem, options}: Props) {
  return (
    <table className={styles.table}>
      <tbody>
        <div className={styles.table_rows}>
          {data?.map((item) => (
            <tr key={item.id}>
              <div className={styles.table_row}>
                {leadItem && <td className={styles.lead}>{item['lead']}</td>}
                {headers.map((header, index) => (
                  <td key={index}>
                    <p className={styles.title}>{header.title}</p>
                    <p className={styles.value}>{item[header.query]}</p>
                  </td>
                ))}
                {options && (
                  <UiButton  variant='secondary' size='icon'>
                    <UiIcon icon='ThreeDots' size='24'/>
                  </UiButton>
                )}
              </div>
            </tr>
          ))}
        </div>
      </tbody>
    </table>
  );
}

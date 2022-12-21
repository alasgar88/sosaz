import { AiOutlinePlus } from 'react-icons/ai';
import { Button, Tooltip } from 'antd';
import style from './PageButton.module.scss';

export default function PageButton({ title, onAddClick, icon }) {
  return (
    <div className={style.container}>
      {onAddClick !== undefined && (
        <Tooltip placement='left' title={`Yeni ${title} əlavə et`}>
          <Button
            size='small'
            onClick={onAddClick}
            icon={icon ? { icon } : <AiOutlinePlus />}
          />
        </Tooltip>
      )}
    </div>
  );
}

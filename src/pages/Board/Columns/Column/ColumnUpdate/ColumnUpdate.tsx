import { IBoard, IColumn, ICreationInput } from 'interfaces';
import InputText from 'components/Forms/InputText';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { updateBoard } from 'redux/actions/board';
import { AppDispatch } from 'redux/store';
import styles from './index.module.scss';
import { updateColumn } from 'redux/actions/columns';
import { useNavigate } from 'react-router';
import { RefObject, useRef } from 'react';
import useOutside from 'hooks/useOutside';

type Inputs = ICreationInput;

type DispatchProps = {
  update: (data: ICreationInput) => void;
};

type OwnProps = {
  column: IColumn;
};

type Props = OwnProps & DispatchProps;

const ColumnUpdate = ({ column, update }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const wrapperRef: RefObject<HTMLFormElement> = useRef(null);
  useOutside<HTMLFormElement>(wrapperRef, `/boards/${column.boardId}`);

  return (
    <form className={styles.box} onSubmit={handleSubmit(update)} ref={wrapperRef}>
      <InputText<Inputs>
        error={errors.title}
        register={register}
        name="title"
        required="this field is required!"
        defaultValue={column.title}
        extraClass={styles.input}
      />
    </form>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch, { column }: OwnProps) => ({
  update: (body: ICreationInput) => {
    dispatch(updateColumn({ column, body }));
  },
});

export default connect(null, mapDispatchToProps)(ColumnUpdate);

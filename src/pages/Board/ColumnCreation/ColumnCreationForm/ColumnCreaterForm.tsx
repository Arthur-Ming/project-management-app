import InputButton from 'components/Forms/InputButton';
import InputText from 'components/Forms/InputText';
import { ICreateColumnBody } from 'interfaces';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { createColumn } from 'redux/actions/columns';
import { AppDispatch } from 'redux/store';
import styles from './index.module.scss';

type Inputs = ICreateColumnBody;

type StateProps = {
  isLoading: boolean;
};

type DispatchProps = {
  create: (body: ICreateColumnBody) => void;
};

interface OwnProps {
  boardId: string;
}

type Props = OwnProps & StateProps & DispatchProps;

const ColumnCreaterForm = ({ create, isLoading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  return (
    <form className={styles.box}>
      <InputText<Inputs>
        error={errors.title}
        register={register}
        name="title"
        required="this field is required!"
        placeholder="bdbdf"
      />

      <div className={styles.buttons}>
        <InputButton
          disabled={isLoading}
          type="submit"
          value="Готово"
          onClick={handleSubmit(create)}
        />
        <InputButton disabled={false} type="button" value="Очистить" onClick={() => reset()} />
      </div>
    </form>
  );
};

const mapStateToProps = () => ({
  isLoading: false,
});

const mapDispatchToProps = (dispatch: AppDispatch, props: OwnProps) => ({
  create: (body: ICreateColumnBody) => dispatch(createColumn(props.boardId, body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ColumnCreaterForm);

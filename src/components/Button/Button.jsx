import css from './BtnLoad.module.css';

export const Button = ({onClick }) => {
    return (
      <div className={css.wrapper}> <button type="button" className={css.loadMore} onClick={onClick }>Load more</button> </div> 
    )
 }
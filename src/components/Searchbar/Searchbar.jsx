import { Component } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ImSearch } from 'react-icons/im';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
    state = {
        searchQuery:'',
    }

    onHandlerName = (e) => { 
        this.setState({ searchQuery: e.target.value.toLowerCase() })
    }

    handleSubmit = (e) => { 
        e.preventDefault();
        if (!this.state.searchQuery.trim()) { 
     toast.error("Entry name")
      return;
    }
        this.props.onSubmit(this.state.searchQuery)
        this.setState({ searchQuery: '' })
        this.reset()
    }
    reset = () => { 
       this.setState({searchQuery: ''}) 
    }
  
    render() {
        return (
            <header className={css.searchbar }>
                <form onSubmit={this.handleSubmit} className={ css.searchForm}>
                    <button type="submit" className={css.searchFormBtn}  >
                <ImSearch style={{marginRight:8}} />
              </button>   
              <input        
      onChange={this.onHandlerName}
      value={this.state.searchQuery}
                        className={css.searchFormIinput }
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>
        )
     }
 }
import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import './index.less';
import head from 'static/pig.jpeg';

@connect((state)=>(state))
class Page extends Component{

    constructor(props){
        super(props);
        this.state = {
            active:false
        }
        this.scroll = (e) => {
            if(document.documentElement.scrollTop>20){
                this.setState({
                    active:true
                })
            }else{
                this.setState({
                    active:false
                })
            }
        }
        if (document.addEventListener) {
            //firefox 
            document.addEventListener('DOMMouseScroll',this.scroll, false); 
            } 
            //ie 谷歌 
           window.onmousewheel = document.onmousewheel = this.scroll;
    }

    componentDidMount(){
       
    };

    toLogin= () => {
        const { history } = this.props;
        history.replace("/login");
    }
    
    render(){
        return (
            <div className='container'>
                <header className='header-container'>
                    <div className='header-background'>
                        <div className={`${'header-navcontainer'} ${this.state.active?'active':''}`}>
                            <div className='header-menucontainer'>
                                <div className='header-barcontainer' onClick={this.toLogin}>
                                    <span className='header-bar'></span>
                                    <span className='header-bar short'></span>
                                    <span className='header-bar'></span>
                                </div>
                                <div className='header-nav'>
                                    <Link to={'/login'}>存点相片呀，图片呀神么的<span role="img"></span>😹</Link>
                                    <Link to={'/login'}>平常收藏的文章啦<span role="img"></span>📄</Link> 
                                    <Link to={'/login'}>联系我呀～♪（＾∀＾●）ﾉｼ<span role="img"></span>✉️</Link> 
                                </div>
                            </div> 
                        </div>
                        <div className='header-content'>
                            <div className='header-infocontainer'>
                                <div className='header-head'>
                                    <img height='124' width='124' src={head} alt="头像"/>
                                </div>
                                <div className='header-title'>
                                    Chiove
                                </div>
                                <div className='header-name'>
                                    江北区梁朝伟
                                </div>
                                <div className='header-number'>
                                    <div className='header-item'>
                                        <div className='header-data'>23</div>
                                        <div>Articls</div>
                                    </div>
                                    <div className='header-item'>
                                        <div className='header-data'>23</div>
                                        <div>Comments</div>
                                    </div>
                                    <div className='header-item'>
                                        <div className='header-data'>23</div>
                                        <div>Bookmarks</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <section className='section-container'>
                    <div className='section-title'>
                        介绍下自己啦！
                    </div>
                    <div className='section-icon'>
                        <Icon type="github" />
                        <Icon type="weibo" />
                        <Icon type="qq" />
                        <Icon type="wechat" />
                    </div>
                    <div className='section-content'>
                        lalalalalalala 我就是我啦,
                        lalalalalalala 我就是我啦,
                        lalalalalalala 我就是我啦,
                        lalalalalalala 我就是我啦,
                        lalalalalalala 我就是我啦,
                        lalalalalalala 我就是我啦,
                        lalalalalalala 我就是我啦,
                        lalalalalalala 我就是我啦,
                        lalalalalalala 我就是我啦,
                        lalalalalalala 我就是我啦,
                        lalalalalalala 我就是我啦,
                        lalalalalalala 我就是我啦,
                        lalalalalalala 我就是我啦,
                        lalalalalalala 我就是我啦,
                        lalalalalalala 我就是我啦,
                    </div>
                </section>
            </div>
        )
    }
}
export default Page

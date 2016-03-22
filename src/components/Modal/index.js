import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import ModalStore from './store';
import ModalActions from './actions';

import FileStreamSelector from './components/fileStreamSelector';
import URLContents from './components/URLadd';
import Thinking from './components/Thinking';

export
default React.createClass({

    mixins: [PureRenderMixin],

    getInitialState() {

        var modalState = ModalStore.getState();

        return {
            Thinking: modalState.thinking,
            modalIsOpen: modalState.open,
            type: modalState.type,
            data: modalState.data
        };
    },

    componentDidMount() {
        ModalStore.listen(this.update);
    },

    componentWillUnmount() {
        ModalStore.unlisten(this.update);
    },

    update() {
        if (this.isMounted()) {

            var modalState = ModalStore.getState();

            this.setState({
                modalIsOpen: modalState.open,
                data: modalState.data,
                type: modalState.type,
                Thinking: modalState.thinking
            });
        }
    },

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    },

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    },

    getContents() {
        switch (this.state.type) {
            case 'URLAdd':
                return <URLContents />;
                break;
            case 'fileSelctor':
                return <FileStreamSelector />;
                break;
            case 'thinking':
                return <Thinking />;
                break;
        }
    },

    render() {
        return (
            <div style={{width: '0px', height: '0px'}}>
                {this.getContents()}
            </div>
        );
    }
});
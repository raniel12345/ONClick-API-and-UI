import React, { Component } from 'react';
import { Camelize } from '../../utils';
const CreateProductContext = React.createContext();
// Provider
// Consumers

class CreateProductProvider extends Component {
    state = {
        isPublic: true,
        subProject: {
            id: 0,
            title: ''
        },
        title: '',
        description: '',
        homePage: '',
        tags: [],
        subProjectDialogOpen: false
    };

    // componentDidMount() {
    //     this.addTag('Raniel Garcia');
    //     this.addTag('Testing only');
    // }

    setFormInputVal = (key, value) => {
        this.setState(() => {
            return {
                ...this.state,
                [key]: value
            };
        });
    };

    openProjectsModal = () => {
        this.setState(() => {
            return {
                subProjectDialogOpen: true
            };
        });
    };

    closeProjectsModal = () => {
        this.setState(() => {
            return {
                subProjectDialogOpen: false
            };
        });
    };

    setSubProject = (id, title) => {
        if (id && title) {
            this.setState(() => {
                return {
                    subProject: {
                        id,
                        title
                    }
                };
            });

            this.closeProjectsModal();
        }
    };

    addTag = tag => {
        let tempTags = this.state.tags;

        if (tempTags.includes(tag) === false) {
            tempTags.push(Camelize(tag));
            this.setState(() => {
                return {
                    tags: tempTags
                };
            });
        }
    };

    deleteTag = tag => {
        let tempTags = [...this.state.tags];
        const idx = tempTags.indexOf(tag);
        tempTags.splice(idx, 1);
        this.setState(() => {
            return {
                tags: tempTags
            };
        });
    };

    render() {
        return (
            <CreateProductContext.Provider
                value={{
                    ...this.state,
                    setFormInputVal: this.setFormInputVal,
                    openProjectsModal: this.openProjectsModal,
                    closeProjectsModal: this.closeProjectsModal,
                    setSubProject: this.setSubProject,
                    addTag: this.addTag,
                    deleteTag: this.deleteTag
                }}
            >
                {this.props.children}
            </CreateProductContext.Provider>
        );
    }
}

const CreateProductConsumer = CreateProductContext.Consumer;

export { CreateProductProvider, CreateProductConsumer };

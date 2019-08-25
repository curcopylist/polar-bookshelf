import * as React from 'react';
import {AnnotationTypes} from "../../../../../../web/js/metadata/AnnotationTypes";
import {Optional} from "../../../../../../web/js/util/ts/Optional";
import {HighlightColors} from "../../../../../../web/js/metadata/HighlightColor";
import {BaseDocAnnotation} from "../../../../../../web/js/datastore/sharing/db/doc_annotations/BaseDocAnnotation";
import {ITextHighlight} from "../../../../../../web/js/metadata/ITextHighlight";
import {TextHighlights} from "../../../../../../web/js/metadata/TextHighlights";

/**
 * A generic wrapper that determines which sub-component to render.
 */
export class TextHighlightDocAnnotationComponent extends React.Component<IProps, IState> {

    constructor(props: IProps, context: any) {
        super(props, context);

        this.state = {};

    }

    public render() {

        const { docAnnotation } = this.props;
        const original = docAnnotation.original as ITextHighlight;

        const attrType = AnnotationTypes.toDataAttribute(docAnnotation.annotationType);

        const html = TextHighlights.toHTML(original);

        const key = 'text-highlight-' + docAnnotation.id;

        const borderColor = HighlightColors.toBackgroundColor(original.color, 0.7);

        return (

            <div className="m-0 mb-2">

                <div key={key}
                     data-annotation-id={docAnnotation.id}
                     data-annotation-type={attrType}
                     data-annotation-color={original.color}
                     className={attrType}>

                    {/*NOTE: this HTML layout is specifically designed to prevent */}
                    {/*excess HTML element copying when the user double clicks the */}
                    {/*text.  Placing the elements in the div layout below (with */}
                    {/*trailing empty div in a flexbox parent) prevents the form */}
                    {/*boxes that follow from being selected.*/}
                    <div style={{display: 'flex', flexDirection: 'column'}}>

                        <div style={{display: 'flex'}}>

                            <div className="p-1"
                                 style={{
                                     borderLeft: `5px solid ${borderColor}`
                                 }}>

                            </div>

                            <div className="text-sm"
                                 dangerouslySetInnerHTML={{__html: html}}>

                            </div>

                            <div/>

                        </div>


                        <div>
                        </div>

                    </div>

                </div>

            </div>
        );
    }

}
interface IProps {

    readonly docAnnotation: BaseDocAnnotation;

}

interface IState {

}

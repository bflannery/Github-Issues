import React from 'react';

const Card = ({
    children,
    classPrefix,
    title
}) => {
    return (
        <div className={`${classPrefix}-card card`}>
            <div className={`${classPrefix}-card-header card__header`}>
                <h4 className={`${classPrefix}-card-header-title card__header-title`}>
                    {title}
                </h4>
            </div>
            <div className="app-page-left-column-card-body card__body">
                {children}
            </div>
        </div>
    )
}

export default Card

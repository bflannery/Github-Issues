import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useDrag, useDrop } from 'react-dnd'
import avatarPlaceholder from '../static/avatar.png'

const ItemTypes = {
    ISSUE: 'issue',
}

const Issue = ({ issue, index, moveIssue }) => {
    const { assignee } = issue

    const avatarSrc = (
        assignee !== null && assignee.hasOwnProperty('avatar_url')
            ? assignee.avatar_url
            : avatarPlaceholder
    )

    const ref = useRef(null)

    const [, drop] = useDrop({
        accept: ItemTypes.ISSUE,
        hover(item, monitor) {
            if (!ref.current) {
                return
            }

            const dragIndex = item.index

            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            // Time to actually perform the action
            moveIssue(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.ISSUE, id: issue.id, index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1

    drag(drop(ref))
    return (
        <li
            ref={ref}
            style={{  opacity }}
            className="issues__issue"
            key={issue.id}
        >
            <img
                className="issues__issue-assignee-img"
                src={avatarSrc}
                alt="assignee-avatar"
            />
            <h4
                className="issues__issue-title"
            >
                {issue.title}
            </h4>
            <h6>{issue.createdAt}</h6>
            <h6>{issue.updatedAt}</h6>
        </li>
    )
}

export default Issue

Issue.propTypes = {
    issue: PropTypes.shape({
        created_at: PropTypes.string,
        id: PropTypes.number,
        index: PropTypes.number,
        moveCard: PropTypes.func,
        title: PropTypes.string,
        updated_at: PropTypes.string,
    })
}


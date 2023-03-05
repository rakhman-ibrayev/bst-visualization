import { useState, useEffect } from 'react'
import BST from './BST'
import './App.css'

const TREE = new BST()

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function Tree({ root, treeSide, hasParent }) {
    if (!root) return null
    const hasChild = root.left || root.right

    return (
        <div className={`sub-tree ${hasParent ? 'sub-tree--with-parent' : ''} ${treeSide || ''}`}>
            {hasParent
                ? <div className={`path ${hasChild ? 'path--with-child' : ''}`} aria-hidden />
                : null
            }

            <div className={`node ${hasChild ? 'node--with-child' : 'node--without-child'}`}>
                {root.value}
            </div>

            <div className="children">
                <Tree root={root.left} treeSide="sub-tree--left" hasParent={true} />
                <Tree root={root.right} treeSide="sub-tree--right" hasParent={true} />
            </div>
        </div>
    )
}

function App() {
    const [root, setRoot] = useState(null)

    useEffect(() => {
        const handleSpaceClick = (event) => {
            if (event.key !== ' ' && event.key !== 'Space Bar') return
            TREE.put(getRandomNumber(-100, 100))
            setRoot({ ...TREE.root })
        }

        document.addEventListener('keyup', handleSpaceClick)
        return () => document.removeEventListener('keyup', handleSpaceClick)
    }, [])

    return (
        <main className="tree">
            {root
                ? <Tree root={root} hasParent={false} />
                : <p>Нажмите на кнопку "Пробел", чтобы создать дерево.</p>
            }
        </main>
    )
}

export default App
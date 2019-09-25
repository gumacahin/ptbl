import React, {
  useState
  // useRef,
  // useEffect
} from 'react';
import elements from './PeriodicTable.json';
import classNames from 'classnames';
import './App.css';
import './CPKColors.css';
import './CategoryColors.css';

function RectBox({activeTemp, activeElement, activeGroup,
  activePeriod, activeCategory, setActiveCategory}) {
  // if (activeTemp !== null) {
  //   return (<div className="temp-indicator">Temps</div>);
  // }

  // category class name
  function ccn(category) {
    let cn = classNames(category);
    if (activeCategory.length === 0 && activeElement === null) {
      return cn;
    }

    if (activeCategory.length !== 0) {
      if (activeCategory.indexOf(category) !== -1) {
        cn = classNames(cn, 'active');
      } else {
        cn = classNames(cn, 'inactive');
      }
    }

    if (activeElement !== null) {
      if (getElementCategories(activeElement).indexOf(category) !== -1) {
        cn = classNames(cn, 'active');
      } else {
        cn = classNames(cn, 'inactive');
      }
    }

    return cn;
  }

  return (
    <div className="category-indicator">
      <div className="metals">
        <div className={ccn("all-metals")}
          onMouseEnter={(e) => setActiveCategory(['all-metals', 'alkali-metal',
            'alkaline-earth-metal', 'lanthanide', 'actinide',
            'transition-metal', 'post-transition-metal'])}
          onMouseLeave={(e) => setActiveCategory([])}
          ><div>Metals</div></div>
        <div className="metal-categories">
          <div className={ccn("alkali-metal")}
          onMouseEnter={(e) => setActiveCategory(['all-metals', 'alkali-metal'])}
          onMouseLeave={(e) => setActiveCategory([])}
            ><div>Alkali Metals</div></div>
          <div className={ccn("alkaline-earth-metal")}
            onMouseEnter={(e) => setActiveCategory(['all-metals', 'alkaline-earth-metal'])}
            onMouseLeave={(e) => setActiveCategory([])}
            ><div>Alkaline Earth Metals</div></div>
          <div className={ccn("lanthanide")}
            onMouseEnter={(e) => setActiveCategory(['all-metals', 'lanthanide'])}
            onMouseLeave={(e) => setActiveCategory([])}
            ><div>Lanthanoids</div></div>
          <div className={ccn("actinide")}
            onMouseEnter={(e) => setActiveCategory(['all-metals', 'actinide'])}
            onMouseLeave={(e) => setActiveCategory([])}
            ><div>Actinoids</div></div>
          <div className={ccn("transition-metal")}
            onMouseEnter={(e) => setActiveCategory(['all-metals', 'transition-metal'])}
            onMouseLeave={(e) => setActiveCategory([])}
            ><div>Transition Metals</div></div>
          <div className={ccn("post-transition-metal")}
            onMouseEnter={(e) => setActiveCategory(['all-metals', 'post-transition-metal'])}
            onMouseLeave={(e) => setActiveCategory([])}
            ><div>Post-Transition Metals</div></div>
        </div>
      </div>
      <div className={ccn("metalloid")}
        onMouseEnter={(e) => setActiveCategory(['metalloid'])}
        onMouseLeave={(e) => setActiveCategory([])}
        ><div>Metalloids</div></div>
      <div className="nonmetals">
        <div className={ccn("all-nonmetals")}
          onMouseEnter={(e) => setActiveCategory(['all-nonmetals', 'diatomic-nonmetal',
            'polyatomic-nonmetal', 'noble-gas'])}
          onMouseLeave={(e) => setActiveCategory([])}
          ><div>Nonmetals</div></div>
        <div className="nonmetal-categories">
          <div className={ccn("polyatomic-nonmetal")}
            onMouseEnter={(e) => setActiveCategory(['all-nonmetals', 'polyatomic-nonmetal'])}
            onMouseLeave={(e) => setActiveCategory([])}
            ><div>Polyatomic Nonmetal</div></div>
          <div className={ccn("diatomic-nonmetal")}
            onMouseEnter={(e) => setActiveCategory(['all-nonmetals', 'diatomic-nonmetal'])}
            onMouseLeave={(e) => setActiveCategory([])}
            ><div>Diatomic Nonmetal</div></div>
          <div className={ccn("noble-gas")}
            onMouseEnter={(e) => setActiveCategory(['all-nonmetals', 'noble-gas'])}
            onMouseLeave={(e) => setActiveCategory([])}
            ><div>Noble Gases</div></div>
        </div>
      </div>
    </div>
  );
}

function getElementCategories(el) {
  let categories = [];
  switch (el.category) {
    case 'metalloid':
      categories  = ['metalloid'];
      break;
    case 'alkali metal':
      categories = ['alkali-metal', 'all-metals'];
      break;
    case 'alkaline earth metal':
      categories = ['alkaline-earth-metal', 'all-metals'];
      break;
    case 'lanthanide':
      categories = ['lanthanide', 'all-metals'];
      break;
    case 'actinide':
      categories = ['actinide', 'all-metals'];
      break;
    case 'transition metal':
      categories = ['transition-metal', 'all-metals'];
      break;
    case 'post-transition metal':
      categories = ['post-transition-metal', 'all-metals'];
      break;
    case 'polyatomic nonmetal':
      categories = ['polyatomic-nonmetal', 'all-nonmetals'];
      break;
    case 'diatomic nonmetal':
      categories = ['diatomic-nonmetal', 'all-nonmetals'];
      break;
    case 'noble gas':
      categories = ['noble-gas', 'all-nonmetals'];
      break;
    default:
      categories = ['unknown'];
      break;
    }
    return categories;
  }

function ElementDetails({activeElement}) {

  return (
    <div className="element-details">
      <div className={`large-element-box jmol ${activeElement.symbol}${activeElement.number > 109 ? ' unknown-color' : ''}`}>
        <div className="main">
          <div className="atomic-weight">{activeElement.atomic_mass}</div>
          <div className="oxidation_states">
              {typeof activeElement.oxidation_states === 'string' ?
                  activeElement.oxidation_states.split(', ').join(',')
                  : activeElement.oxidation_states}
          </div>
          <div className="atomic-symbol">{activeElement.symbol}</div>
        </div>
        <div className="left">
          <div className="atomic-number">{activeElement.number}</div>
          <div className="boiling-point">{activeElement.boil}</div>
          <div className="melting-point">{activeElement.melt}</div>
          <div className="density">{activeElement.density}</div>
        </div>
        <div className="bot">
          <div className="electron-config">{activeElement.electron_configuration}</div>
          <div className="element-name">{activeElement.name}</div>
        </div>
      </div>
    </div>
  );
}

function PhaseReferenceBox(props) {
  const {activePhase, setActivePhase} = props;
  const phases = [
    {disp: "Pt", phase: "solid" },
    {disp: "Hg", phase: "liquid" },
    {disp: "N" , phase: "gas" },
  ];

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  const phaseRows = phases.map((p) => (
    <div
      key={p.disp}
      className={
        classNames('row', p.phase,
          activePhase && (activePhase === p.phase ? "active" : "inactive"))
      }
      onMouseEnter={ (e) => setActivePhase(p.phase) }
      onMouseLeave={ (e) => setActivePhase(null) }
      >
      <div className="elem"><div>{p.disp}</div></div>
      <div className="state">{capitalize(p.phase)}</div>
    </div>
  ));

  return (
    <div className="phase-ref-box">
        {phaseRows}
    </div>
    );
}

function SquareBox(props) {

  let content;

  if (props.activeElement !== null) {
    content = <ElementDetails activeElement={props.activeElement} />
  } else {
    content = <PhaseReferenceBox {...props} />
  }
  return (<div className="square-box">{content}</div>);
}

function ElementRefBox() {
  return (
    <td className="element-box ref-box">
      <div className="element">
        <div className="number">Number</div>
        <div className="symbol">Sym</div>
        <div className="name">Name</div>
        <div className="atomic-mass">Mass</div>
      </div>
    </td>
  );
}


function getElementPhase(elem, activeTemperature) {
  const phases = ['solid', 'liquid', 'gas'];
  const index = phases.indexOf(elem.phase.toLowerCase());

  return index !== -1 ? phases[index] : 'unknown';
}

function categoryToColorClass(str) {
  if (str.indexOf('unknown') !== -1) {
    return 'unknown-category';
  }
  return str.replace(/\s+/g, '-');
}

function getClassName(props) {
  let cn = classNames(props.element.symbol, 'element-box');

  if (props.activeElement !== null) {
    cn = classNames(cn, 'jmol', 
      props.activeElement.number === props.element.number ? "active" : "inactive" 
    );
  } else if (props.activeGroup !== null) {
    cn = classNames(cn, 'jmol', 
      props.activeGroup === props.element.group ? "active" : "inactive" 
    );
  } else if (props.activePeriod !== null) {
    cn = classNames(cn, 'jmol', 
      props.activePeriod === props.element.period ? "active" : "inactive" 
    );
  } else if (props.activeCategory.length > 0) {
    cn = classNames(cn, 'categories',
      categoryToColorClass(props.element.category), 
      props.activeCategory.indexOf(categoryToColorClass(props.element.category)) !== -1 ? 
      "active" : "inactive");
  } else if (props.activePhase !== null) {
    const phase = getElementPhase(props.element)
    cn = classNames(cn, 'phase', phase,
      props.activePhase === phase ? "active" : "inactive");
  } else {
    cn = classNames(cn, 'jmol')
  }
  return cn;
}

function Element(props) {
  const {groupNum, periodNum, setActiveElement, activeElement, activePhase,
    setActivePhase, activeCategory, setActiveCategory} = props;

  const el = elements.find(el => el.xpos === groupNum && el.ypos === periodNum);

  if (el) {
    return (
      <td className={getClassName({...props, element: el})}
        onMouseEnter={(e) => setActiveElement(el)}
        onMouseLeave={(e) => setActiveElement(null)}
        >
        <div
          className="element" id={el.name} >
        <div className="number">{el.number}</div>
        <div className={`symbol ${getElementPhase(el)}`}>{el.symbol}</div>
        <div className="name">{el.name}</div>
        <div className="atomic-mass">{el.atomic_mass}</div>
      </div>
    </td>
    );
  }

  if (groupNum === 2 && periodNum === 1) {
    return <ElementRefBox />;
  }

  if (groupNum === 3 && periodNum === 1) {
    return (
      <td className="indicators-box" rowSpan="3" colSpan="10">
        <div className="indicators">
          <SquareBox activeElement={activeElement}
            activePhase={activePhase} setActivePhase={setActivePhase} />
          <RectBox activeElement={activeElement}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory} />
        </div>
      </td>
    );
  }

  if (groupNum === 13 && periodNum === 1) {
    return (
      <td id="slider-box" colSpan="5">
      </td>
    );
  }

  if (groupNum === 3 && periodNum === 6) {
    return (
      <td className="element-box lanthanides-selector">
        <div className="element">57–71</div>
      </td>
    );
  }

  if (groupNum === 3 && periodNum === 7) {
    return (
      <td className="element-box actinides-selector">
        <div className="element">89-103</div>
      </td>
    );
  }

  if ((groupNum > 2 && groupNum < 13 && periodNum > 0 && periodNum < 4) ||
    (groupNum > 13 && groupNum < 18 && periodNum > 0 && periodNum < 2)) {
    return null;
  }

  return (<td data-pos={`${groupNum},${periodNum}`} className="empty-cell"></td>);
}

function GroupHeader(props) {
  const {activeGroup, setActiveGroup, activeElement } = props;

  let groups = [<th id="the-corner" className="group-header" key="0"></th>];

  for (let groupNum = 1; groupNum < 19; groupNum++) {
    let className = 'group-selector';
    if (activeGroup !== null || activeElement !== null ) {
      className += (
        (activeGroup !== null && activeGroup === groupNum) ||
        (activeElement !== null && activeElement.group === groupNum))
        ? " active" : " inactive";
    }
    groups = [
      ...groups,
      <th
        onMouseEnter={(e) => setActiveGroup(groupNum)}
        onMouseLeave={(e) => setActiveGroup(null)}
        key={groupNum} className="group-header" id={`group-${groupNum}`}
        span="cols" >
      <div title={`Group ${groupNum}`} className={className}>{groupNum}</div>
    </th>
    ];
  }

  return (
    <tr id="group-headers">{groups}</tr>
  );
}

function Period(props) {
  const {
    periodNum, activeElement,
    activePeriod, setActivePeriod,
  } = props;
  let elements = [];
  for (let groupNum = 1; groupNum < 19; groupNum++) {
    elements = [
      ...elements,
      <Element
        key={`${groupNum}-${periodNum}`}
        groupNum={groupNum}
        {...props}
      />
    ];
  }

  let className = 'period-selector';

  if (activePeriod !== null || activeElement !== null) {
    className += (periodNum === activePeriod ||
      (activeElement !== null && activeElement.period === periodNum))
      ? ' active' : ' inactive';
  }

  return (
    <tr className="period">
        { periodNum < 9 ?
            <th className="period-header" span="rows">
              <div 
                className={className}
                onMouseEnter={(e) => setActivePeriod(periodNum)} 
                onMouseLeave={(e) => setActivePeriod(null)}
                >{periodNum}</div>
            </th>
            :
            <td className="empty-cell"></td>
        }
              {elements}
          </tr>
  );
}

function Periods(props) {
  let periods = [];
  for (let periodNum = 1; periodNum < 11; periodNum++) {
    periods = [
      ...periods,
      <Period
        key={periodNum}
        periodNum={periodNum}
        {...props}
        />
    ];
  }
  return periods;
}

function PeriodicTable() {
  const [activePeriod, setActivePeriod] = useState(null);
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeElement, setActiveElement] = useState(null);
  const [activeCategory, setActiveCategory] = useState([]);
  const [activePhase, setActivePhase] = useState(null);

  return (
    <table id="periodic-table">
      <caption>Periodic Table of Elements</caption>
      <tbody>
        <GroupHeader
          activeGroup={activeGroup}
          activeElement={activeElement}
          setActiveGroup={setActiveGroup}

          />
        <Periods
          activePeriod={activePeriod}
          setActivePeriod={setActivePeriod}
          activeGroup={activeGroup}
          activeElement={activeElement}
          setActiveElement={setActiveElement}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activePhase={activePhase}
          setActivePhase={setActivePhase}
          />
      </tbody>
    </table>
  );
}


function App() {
  return (
    <div className="App">
      <PeriodicTable />
      <p class="about">
          Inspired by <a href="https://ptable.com">Ptable.com</a>.
          Displayed with data from <a href="https://github.com/Bowserinator/Periodic-Table-JSON/blob/master/PeriodicTableJSON.json">Periodic-Table.json</a>.
          Source at <a href="https://github.com/gumacahin/ptbl">GitHub</a>
      </p>
    </div>
  );
}

export default App;

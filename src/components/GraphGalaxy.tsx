import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GraphMazeGame from './games/GraphMazeGame';
import DFSGame from './games/DFSGame';
import BFSGame from './games/BFSGame';
import DijkstraGame from './games/DijkstraGame';

interface GraphGalaxyProps {
  onBackToUniverse: () => void;
}

const algorithms = [
  {
    name: 'Depth-First Search',
    description: 'Navigate deep into cosmic caves',
    color: 'from-purple-400 to-indigo-400',
    icon: '🕳️'
  },
  {
    name: 'Breadth-First Search',
    description: 'Explore star systems level by level',
    color: 'from-blue-400 to-cyan-400',
    icon: '🌊'
  },
  {
    name: 'Dijkstra\'s Algorithm',
    description: 'Find shortest paths through space',
    color: 'from-green-400 to-emerald-400',
    icon: '🛣️'
  },
  {
    name: 'Maze Navigator',
    description: 'Navigate through cosmic mazes',
    color: 'from-pink-400 to-rose-400',
    icon: '🌌'
  }
];

const GraphGalaxy: React.FC<GraphGalaxyProps> = ({ onBackToUniverse }) => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const startGame = (gameName: string) => {
    setCurrentGame(gameName);
  };

  const handleGameComplete = (gameScore: number) => {
    setScore(prev => prev + gameScore);
    setCurrentGame(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0e0b1f] via-[#25143a] to-[#141e30]">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`nebula-${i}`}
            className="absolute w-4 h-4 bg-purple-500 rounded-full animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center">
          <Button
            onClick={onBackToUniverse}
            className="bg-cosmic-teal/20 hover:bg-cosmic-teal/40 text-cosmic-teal border-cosmic-teal/50"
          >
            ← Back to Universe
          </Button>
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              🌌 Graph Galaxy
            </h1>
            <p className="text-cosmic-purple">Score: {score} Cosmic Stars</p>
          </div>
          <div className="w-32" />
        </div>
      </div>

      {/* Algorithm Cards */}
      <div className="relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {algorithms.map((algorithm) => (
              <Card
                key={algorithm.name}
                className="bg-black/30 backdrop-blur-md border-purple-400/30 p-6 hover:border-purple-400/60 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
              >
                <div className={`w-full h-3 rounded-full bg-gradient-to-r ${algorithm.color} mb-4 animate-pulse-glow`} />
                
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2 animate-float">{algorithm.icon}</div>
                  <h3 className="text-xl font-bold text-cosmic-gold mb-2">{algorithm.name}</h3>
                  <p className="text-gray-300 text-sm">{algorithm.description}</p>
                </div>

                <Button
                  className={`w-full bg-gradient-to-r ${algorithm.color} hover:scale-105 transition-transform text-white font-semibold py-3`}
                  onClick={() => startGame(algorithm.name)}
                >
                  ✨ Enter {algorithm.name === 'Maze Navigator' ? 'Maze' : 'Simulation'}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Game Modals */}
      {currentGame === 'Depth-First Search' && (
        <DFSGame
          onComplete={handleGameComplete}
          onClose={() => setCurrentGame(null)}
        />
      )}
      {currentGame === 'Breadth-First Search' && (
        <BFSGame
          onComplete={handleGameComplete}
          onClose={() => setCurrentGame(null)}
        />
      )}
      {currentGame === 'Dijkstra\'s Algorithm' && (
        <DijkstraGame
          onComplete={handleGameComplete}
          onClose={() => setCurrentGame(null)}
        />
      )}
      {currentGame === 'Maze Navigator' && (
        <GraphMazeGame
          onComplete={handleGameComplete}
          onClose={() => setCurrentGame(null)}
        />
      )}
    </div>
  );
};

export default GraphGalaxy;

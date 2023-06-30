kaboom({
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
  clearColor: [0, 0, 0, 1]

})

const MOVE_SPEED = 135
/* 
loadRoot('https://i.imgur.com/') */
loadSprite('link-going-left', 'https://i.imgur.com/1Xq9biB.png')
loadSprite('link-going-right', 'https://i.imgur.com/yZIb8O2.png')
loadSprite('link-going-down', 'https://i.imgur.com/r377FIM.png')
loadSprite('link-going-up', 'https://i.imgur.com/UkV0we0.png')
loadSprite('left-wall', 'https://i.imgur.com/rfDoaa1.png')
loadSprite('top-wall', 'https://i.imgur.com/QA257Bj.png')
loadSprite('bottom-wall', 'https://i.imgur.com/vWJWmvb.png')
loadSprite('right-wall', 'https://i.imgur.com/SmHhgUn.png')
loadSprite('bottom-left-wall', 'https://i.imgur.com/awnTfNC.png')
loadSprite('bottom-right-wall', 'https://i.imgur.com/84oyTFy.png')
loadSprite('top-left-wall', 'https://i.imgur.com/xlpUxIm.png')
loadSprite('top-right-wall', 'https://i.imgur.com/z0OmBd1.jpeg')
loadSprite('top-door', 'https://i.imgur.com/U9nre4n.png')
loadSprite('left-door', 'https://i.imgur.com/okdJNls.png')
loadSprite('fire-pot', 'https://i.imgur.com/I7xSp7w.png')
loadSprite('lanterns', 'https://i.imgur.com/wiSiY09.png')
loadSprite('slicer', 'https://i.imgur.com/c6JFi5Z.png')
loadSprite('skeletor', 'https://i.imgur.com/Ei1VnX8.png')
loadSprite('kaboom', 'https://i.imgur.com/o9WizfI.png')
loadSprite('stairs', 'https://i.imgur.com/VghkL08.png')
loadSprite('bg', 'https://i.imgur.com/u4DVsx6.png')
loadSprite('sword', 'https://i.imgur.com/aWsuAxb.png')
loadSprite('grass', 'https://i.imgur.com/4IzFwwk.png')
loadSprite('hole', 'https://i.imgur.com/jgURLQ2.png')

loadSound('attack', "./sounds/attackSound.mp3")
loadSound('boom', "./sounds/boom.wav")
loadSound('skDie', "./sounds/skeletor.mp3")
loadSound('losing', "./sounds/losing.wav")
loadSound('slDie', "./sounds/slicer.wav")
loadSound('geral', "./sounds/geral.mp3")




scene("game", ({ level, score }) => {

  layers(['bg', 'obj', 'ui'], 'obj')

    if( level == 0)
      play('geral', {
      volume: 0.1,
      loop: true
      })



  
  const maps = [
    [
      'ycc)cc^ccw',
      'a(      (b',
      'a   *    b',
      'a        b',
      '%    }   b',
      'a        b',
      'a   *    b',
      'a(      (b',
      'xdd)dd)ddz',
    ],
    [
      'yccccccccw',
      'a        b',
      ')    (   )',
      'a   }    b',
      '%        b',
      'a   } $  b',
      ')    (   )',
      'a        b',
      'xddddddddz',

    ],
    [
      'yccccccc^w',
      'a        b',
      ')   * }  )',
      'a   }    b',
      '%       *b',
      'a   }    b',
      ')     }  )',
      'a        b',
      'xddddddddz',
    ],
    [ 
      'yccccccccw    ycccccccw',
      'a        b    aggggggg)',
      'a     }  )    aggggg}gb',
      ')        xcccczgggggggb',
      '%    }   hggggggg}gggg$',
      ')        yddddwgggggggb',
      'a     }  )    agggggggb',
      'a        b    aggg}ggg)',
      'xddddddddz    xdddddddz',
    ],
    [
      'ycc)cc)ccw',
      'a  b  a  b',
      'a *   *  )',
      'a  b  a  b',
      '%  b }a  $',
      'a  b  a  b',
      'a *   *  )',
      'a  b  a  b',
      'xdd)dd)ddz',
    ],
    [
      'ycc)cc)ccw',
      'a        b',
      'a    }   )',
      'a     *  b',
      '%    @  $b',
      'a     *  b',
      'a    }   )',
      'a        b',
      'xdd)dd)ddz',
    ]
    
  ]

  const levelCfg = {
    width: 48,
    height: 48,
    'a': [sprite('left-wall'), solid(), 'wall'],
    'b': [sprite('right-wall'), solid(), 'wall'],
    'c': [sprite('top-wall'), solid(), 'wall'],
    'd': [sprite('bottom-wall'), solid(), 'wall'],
    'g': [sprite('grass')],
    'h': [sprite('hole')],
    'w': [sprite('top-right-wall'), solid(), 'wall'],
    'x': [sprite('bottom-left-wall'), solid(), 'wall'],
    'y': [sprite('top-left-wall'), 'wall'],
    'z': [sprite('bottom-right-wall'), solid(), 'wall'],
    '%': [sprite('left-door'), solid(), 'wall'],
    '^': [sprite('top-door'), 'next-level'],
    '$': [sprite('stairs'), 'next-level'],
    '*': [sprite('slicer'), 'slicer', { dir: -1 }, 'dangerous'],
    '}': [sprite('skeletor'), 'dangerous', { dir: -1, timer: 0 }, 'skeletor'],
    ')': [sprite('lanterns'), solid(), 'wall'],
    '(': [sprite('fire-pot'), solid()],
    '@': [sprite('skeletor'), 'dangerous', { dir: -1, timer: 0, scale: 1.4}, 'skeletor'],
  }
  addLevel(maps[level], levelCfg)

  add([sprite('bg'), layer('bg')])

  const scoreLabel = add([
    text('0'),
    pos(400, 450),
    layer('ui'),
    {
      value: score,
    },
    scale(4)
  ])

  add([text('level ' + parseInt(level + 1)), pos(400, 500), scale(3)])
 
  volume(0.3)

  const player = add([
    sprite('link-going-right'),
    pos(5, 190),
    
    {
      dir: vec2(1, 0),
    }
  ])

  player.action(() => {
    player.resolve()
  })
  //troca de level/mapa
  player.overlaps('next-level', () => {
    go("game", {
      level: (level + 1) % maps.length,
      score: scoreLabel.value
    })

  })
  //movimentação do personagem --------------------------------------
  keyDown('left', () => {
    player.changeSprite('link-going-left')
    player.move(-MOVE_SPEED, 0)
    player.dir = vec2(-1, 0)

  })

  keyDown('right', () => {
    player.changeSprite('link-going-right')
    player.move(MOVE_SPEED, 0)
    player.dir = vec2(1, 0)

  })

  keyDown('up', () => {
    player.changeSprite('link-going-up')
    player.move(0, -MOVE_SPEED)
    player.dir = vec2(0, -1)
  })

  keyDown('down', () => {
    player.changeSprite('link-going-down')
    player.move(0, MOVE_SPEED)
    player.dir = vec2(0, 1)
  })
  //----------------------------------------------------------------
  //Animação do ataque
  function spawnKaboom(p) {
    const obj = add([sprite('kaboom'), pos(p), 'kaboom'])
    camShake(1)
    play('boom')
    wait(0.3, () => {
      destroy(obj)
      
    })
  }

  function hitSword(p) {
    const obj = add([sprite('sword'), pos(p), 'sword'])
    play('attack')
    wait(0.08, () => {
      destroy(obj)
    })
  }
 //funções dos botões de ataque 
  keyPress('space', () => {
    spawnKaboom(player.pos.add(player.dir.scale(48)))
  })

  keyPress('x', () => {
    hitSword(player.pos.add(player.dir.scale(40)))
  })


  //função para destruir o slicer, somente o kaboom poderá destruir o slicer
  collides('kaboom', 'slicer', (k, s) => {
    play('slDie')
    camShake(4)
    wait(1, () => {
      destroy(k)
    })
    destroy(s)
    scoreLabel.value++
    scoreLabel.text = scoreLabel.value
  })
  
  //função/s para o ataque "destruir" o skeletor
  collides('kaboom', 'skeletor', (k, s) => {
    play('skDie')
    camShake(4)
    wait(1, () => {
      destroy(k)
    })
    destroy(s)
    scoreLabel.value++
    scoreLabel.text = scoreLabel.value
  })

  collides('sword', 'skeletor', (sw, s) => {
    play('skDie')
    camShake(2)
    wait(1, () => {
      destroy(sw)
    })
    destroy(s)
    scoreLabel.value += 2
    scoreLabel.text = scoreLabel.value
  })
  
  //movimento do slicer
  const SLICER_SPEED = 100
  action('slicer', (s) => {
    s.move(s.dir * SLICER_SPEED, 0)
  
    
  })

  collides('slicer', 'wall', (s) => {
    s.dir = -s.dir
  })


  //movimento do skeletor
  const SKELETOR_SPEED = 80
  action('skeletor', (s) => {
    s.move(0, s.dir * SKELETOR_SPEED)
    s.timer -= dt()
    if (s.timer <= 0) {
      s.dir = -s.dir
      s.timer = rand(5)
    }
  })

  //colisão skeletor
  collides('skeletor', 'wall', (s) => {
    s.dir = -s.dir
  })

  //colisão com "morte"
  player.overlaps('dangerous', () => {
    go('lose', { score: scoreLabel.value })
  })


  //Tela de derrota
  scene("lose", ({ score }) => {
    play('losing')
    add([text('Press enter to restart\n\n\n\nFinal score: '+ score, 32), origin('center'), pos(width() / 2, height() / 2)])
    //botão para reiniciar o jogo 
    keyPress('enter', () => {
    go("game", { level: 0, score: 0})
  })

  
})

})



  
start("game", { level: 0, score: 0 })


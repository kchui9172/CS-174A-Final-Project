//  Loop subdivision splines for animated Rome project models   8.04.2013

function load_rome_model(model, vil, morph, z_offset = 0, complexity = 1) {
  var faces = [], ce = [];  // Control Edges
  var lastP, vi = [], ei0 = [], ei = [], fi0 = [], fi = [];
  var n = 1, vil, fil, cpl, cpl3, cel2;
  var an = [], bn = [], aL = [], b, tauc = [[],[],[]], taus = [[],[],[]];
  var p = [], p1 = [],  norm = [];
  var coli = new Float32Array(3*vil);
  var col1 = new Float32Array(3*vil);
  
  function Edge(ps){
    this.PS = ps;   // PS=[p0, p1] indexes of the first and last points of a directional edge
  }
  Edge.prototype.subdiv = function(){
    var  i01 = lastP++,  k = 3*i01,  i0 = this.PS[0], k0 = 3*i0,  i1 = this.PS[1], k1 = 3*i1;
    coli[k++] = .5*(coli[k0++] + coli[k1++]);
    coli[k++] = .5*(coli[k0++] + coli[k1++]);
    coli[k] = .5*(coli[k0] + coli[k1]);
    k = 3*i01;  k0 = 3*i0;  k1 = 3*i1;
    for (var i = 0; i < morph; i++){
      p[i][k] = .5*(p[i][k0] + p[i][k1]);
      p[i][k+1] = .5*(p[i][k0+1] + p[i][k1+1]);
      p[i][k+2] = .5*(p[i][k0+2] + p[i][k1+2]);}
    this.E00 = ei.length;
    ei.push(new Edge([i0, i01]));   ei.push(new Edge([i01, i1]));
    var t = [];
    t[0] = [this.E00, 0];   t[3] = [this.E00 + 1, 1];
    vi.push( t );
    this.P01 = i01;   // P01, E00 - indexes of the child point and first edges
  };
  
  function Face(ed0,ed1,ed2, i0,i1,i2){   // face's edges with orientations
    this.E0 = ed0; this.E1 = ed1; this.E2 = ed2;
    this.I0 = i0; this.I1 = i1; this.I2 = i2;
    this.P0 = ei[ed0].PS[i0]; this.P1 = ei[ed1].PS[i1];  this.P2 = ei[ed2].PS[i2];  // face's points
  }
  Face.prototype.subdiv = function(){
    var m0 = ei0[this.E0].P01, m1 = ei0[this.E1].P01, m2 = ei0[this.E2].P01;
    var em = ei.length;
    ei.push(new Edge([m0, m1]));  ei.push(new Edge([m1, m2]));  ei.push(new Edge([m2, m0]));
    var ed00,ed01,ed10,ed11,ed20,ed21;
    if(this.I0 == 0){
      vi[m0][4] = [em,1];  vi[m0][5] = [em+2,0];
      ed00 = ei0[this.E0].E00; ed01 = ed00 + 1;}
    else{
      vi[m0][1] = [em,1];  vi[m0][2] = [em+2,0];
      ed01 = ei0[this.E0].E00; ed00 = ed01 + 1;}
    if(this.I1 == 0){
      vi[m1][4] = [em+1,1];  vi[m1][5] = [em,0];
      ed10 = ei0[this.E1].E00; ed11 = ed10 + 1;}
    else{
      vi[m1][1] = [em+1,1];  vi[m1][2] = [em,0];
      ed11 = ei0[this.E1].E00; ed10 = ed11 + 1;}
    if(this.I2 == 0){
      vi[m2][4] = [em+2,1];  vi[m2][5] = [em+1,0];
      ed20 = ei0[this.E2].E00; ed21 = ed20 + 1;}
    else{
      vi[m2][1] = [em+2,1];  vi[m2][2] = [em+1,0];
      ed21 = ei0[this.E2].E00; ed20 = ed21 + 1;}
    fi.push(new Face(ed00,em+2,ed21, this.I0,1,this.I2));
    fi.push(new Face(ed10,em,ed01, this.I1,1,this.I0));
    fi.push(new Face(ed20,em+1,ed11, this.I2,1,this.I1));
    fi.push(new Face(em,em+1,em+2, 0,0,0));
  }
  
  function Loop() {
    for (var i = 3; i < 50; i++){
      b = 3/8 + Math.cos(2*Math.PI/i)/4;
      aL[i] = b*b + 3/8;
      an[i] = 2*aL[i] - 1;
      bn[i] = 3/(11 - 8*aL[i]);
      tauc.push([]);  taus.push([]);
      for (var j = 0; j < i; j++){
        tauc[i].push(Math.cos(2*Math.PI*j/i));
        taus[i].push(Math.sin(2*Math.PI*j/i));}
    }
    faces = [];
    var i = 0,  mf = model.faces;
    while(i < mf.length){
      faces.push(mf[i+1], mf[i+2], mf[i+3]);
      if(mf[i] == 10) i += 8;
      else if(mf[i] == 74) i += 9;
      else if(mf[i] == 2) i += 5;
      else alert("face error");
    }
    var vior = [], vic = [];  // parser
    ei = [];  fi = [];  vi = [];  ce = [];
    for (var i = 0; i < cpl; i++){
      vior.push([]);
      vic[i] = [0,0,0];}
    for (var i = 0; i < faces.length; i +=3){
      var a = faces[i],  b = faces[i + 1];
      var id0 = -1, dir0 = 0,  cel = ce.length;
      for (var k = 0; k < cel; k++){
        if( a == ce[k][0] && b == ce[k][1] )  id0 = k;
        if( b == ce[k][0] && a == ce[k][1] ){ id0 = k; dir0 = 1;}}
      if (id0 < 0){ id0 = ce.length;  ce.push([a, b]);  ei.push( new Edge([a, b]) )}
      a = faces[i + 1];  b = faces[i + 2];
      var id1 = -1, dir1 = 0;  cel = ce.length;
      for (var k = 0; k < cel; k++){
        if( a == ce[k][0] && b == ce[k][1] )  id1 = k;
        if( b == ce[k][0] && a == ce[k][1] ){ id1 = k; dir1 = 1;}}
      if (id1 < 0){ id1 = ce.length;  ce.push([a, b]);  ei.push( new Edge([a, b]) )}
      a = faces[i + 2];  b = faces[i];
      var id2 = -1, dir2 = 0;  cel = ce.length;
      for (var k = 0; k < cel; k++){
        if( a == ce[k][0] && b == ce[k][1] )  id2 = k;
        if( b == ce[k][0] && a == ce[k][1] ){ id2 = k; dir2 = 1;}}
      if (id2 < 0){ id2 = ce.length;  ce.push([a, b]);  ei.push( new Edge([a, b]) )}
      fi.push( new Face(id0,id1,id2, dir0,dir1,dir2) );
      vior[faces[i]].push([id0, id2]);  vior[faces[i+1]].push([id1, id0]);
      vior[faces[i+2]].push([id2, id1]);
      vic[faces[i]][0] += model.colors[i];
      vic[faces[i]][1] += model.colors[i + 1];
      vic[faces[i]][2] += model.colors[i + 2];
      vic[faces[i+1]][0] += model.colors[i];
      vic[faces[i+1]][1] += model.colors[i + 1];
      vic[faces[i+1]][2] += model.colors[i + 2];
      vic[faces[i+2]][0] += model.colors[i];
      vic[faces[i+2]][1] += model.colors[i + 1];
      vic[faces[i+2]][2] += model.colors[i + 2];
    }
    for (var i = 0; i < cpl; i++){
      vi[i] = [];
      var e = vior[i][0][0], id = 0;
      if ( ce[e][0] == i ) id = 1;
      vi[i].push([e, id]);
      e = vior[i][0][1];
      if ( ce[e][0] == i ) id = 1; else id = 0;
      vi[i].push([e, id]);
  
      var viorl = vior[i].length;
      for (var j = 1; j < viorl - 1; j++){
        var k = 1;
        while ( e != vior[i][k][0]) k++;
        e = vior[i][k][1];
        if ( ce[e][0] == i ) id = 1; else id = 0;
        vi[i].push([e, id]);
      }
      coli[3*i] = vic[i][0]/viorl;
      coli[3*i + 1] = vic[i][1]/viorl;
      coli[3*i + 2] = vic[i][2]/viorl;
    }
  
    lastP = vil = cpl;
    cel2 = 2*ce.length;
    for (var k = 0; k < morph; k++)
      for (var i = 0; i < cpl3; i++) p[k][i] = model.morphTargets[k][i];
  
    var sx=[], sy=[], sz=[];
    for (var it = 0; it < n; it++){
     ei0 = ei; fi0 = fi;
     var vil0 = vi.length;
     ei = [];  fi = [];
     for (var i = 0; i < ei0.length; i++) ei0[i].subdiv();
     for (var i = 0; i < vil0; i++)
       for (var j = 0; j < vi[i].length; j++)
         vi[i][j][0] = ei0[ vi[i][j][0] ].E00 + 1 - vi[i][j][1];
     for (var i = 0; i < fi0.length; i++) fi0[i].subdiv();
  
     vil = vi.length;
     for (var i = 0; i < vil; i++){
      var sr = sg = sb = 0,  lv = vi[i].length;
      for (var m = 0; m < morph; m++) sx[m] = sy[m] = sz[m] = 0;
      for (var k = 0; k < lv; k++){
        var j = 3* ei[vi[i][k][0]].PS[vi[i][k][1]];
        sr += coli[j];  sg += coli[j+1];  sb += coli[j+2];
        for (var m = 0; m < morph; m++){
          sx[m] += p[m][j];  sy[m] += p[m][j+1];  sz[m] += p[m][j+2];}
      }
      var j = 3*i,  al = an[lv],  be = (1 - al)/lv;
      col1[j] = al*coli[j] + sr*be;
      col1[j+1] = al*coli[j+1] + sg*be;
      col1[j+2] = al*coli[j+2] + sb*be;
      for (var m = 0; m < morph; m++){
        p1[m][j] = al*p[m][j] + sx[m]*be;
        p1[m][j+1] = al*p[m][j+1] + sy[m]*be;
        p1[m][j+2] = al*p[m][j+2] + sz[m]*be;}
     }  
     var t = p; p = p1; p1 = t;    t = coli; coli = col1; col1 = t;
    }  // end it
  
    var x1=[], x2=[], y1=[], y2=[], z1=[], z2=[];
    for (var i = 0; i < vil; i++){
     var sr = sg = sb = 0,  lv = vi[i].length;
     for (var m = 0; m < morph; m++) sx[m]=sy[m]=sz[m] = x1[m]=y1[m]=z1[m] = x2[m]=y2[m]=z2[m] = 0;
     for (var k = 0; k < lv; k++){
       var j = 3*ei[vi[i][k][0]].PS[vi[i][k][1]];
       sr += coli[j];  sg += coli[j+1];  sb += coli[j+2];
       for (var m = 0; m < morph; m++){
         x1[m] += tauc[lv][k]*p[m][j];   x2[m] += taus[lv][k]*p[m][j];    sx[m] += p[m][j];
         y1[m] += tauc[lv][k]*p[m][j+1]; y2[m] += taus[lv][k]*p[m][j+1];  sy[m] += p[m][j+1];
         z1[m] += tauc[lv][k]*p[m][j+2]; z2[m] += taus[lv][k]*p[m][j+2];  sz[m] += p[m][j+2];}
     }
     var j = 3*i,  be = bn[lv],  al = (1 - be)/lv;
     col1[j]   = be*coli[j] +   sr*al;
     col1[j+1] = be*coli[j+1] + sg*al;
     col1[j+2] = be*coli[j+2] + sb*al;
     for (var m = 0; m < morph; m++){
       var x3 = y1[m]*z2[m] - y2[m]*z1[m],
           y3 = x2[m]*z1[m] - x1[m]*z2[m],
           z3 = x1[m]*y2[m] - x2[m]*y1[m];
       var norm3 = Math.sqrt(x3*x3 + y3*y3 + z3*z3);
       norm[m][j] = x3/norm3; norm[m][j+1] = y3/norm3; norm[m][j+2] = z3/norm3;
       p1[m][j] =   be*p[m][j] +   sx[m]*al;
       p1[m][j+1] = be*p[m][j+1] + sy[m]*al;
       p1[m][j+2] = be*p[m][j+2] + sz[m]*al;}
    }  
  }

  if (complexity) {
    n = complexity;
  }
  cpl3 = model.morphTargets[0].length;
  cpl = cpl3 / 3;
  for (var i = 0; i < morph; i++){
    p[i] = new Float32Array(3*vil);
    p1[i] = new Float32Array(3*vil);
    norm[i] = new Float32Array(3*vil);
    for (var k = 1; k < cpl3; k += 3) model.morphTargets[i][k] += z_offset;
  }
  Loop()
  return {
    p1: p1,
    norm: norm,
    col1: col1,
    fi: fi
  }
}
